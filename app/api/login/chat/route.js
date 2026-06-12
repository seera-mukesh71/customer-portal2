import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { HfInference } from '@huggingface/inference';
import Groq from 'groq-sdk';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Generate embedding (same model as ingestion) ────────────────────
async function getEmbedding(text) {
  const result = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: text,
  });
  if (Array.isArray(result[0])) {
    const dim = result[0].length;
    const mean = new Array(dim).fill(0);
    for (const vec of result) {
      for (let i = 0; i < dim; i++) mean[i] += vec[i];
    }
    return mean.map(v => v / result.length);
  }
  return result;
}

// ── Retrieve top-k similar documents ───────────────────────────────
async function retrieveDocuments(queryEmbedding, topK = 3) {
  const vectorString = `[${queryEmbedding.join(',')}]`;
  const result = await pool.query(
    `SELECT content, metadata,
     1 - (embedding <=> $1::vector) AS similarity
     FROM loan_documents
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [vectorString, topK]
  );
  return result.rows;
}

// ── Main POST handler ───────────────────────────────────────────────
export async function POST(request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Embed the user's question
    const queryEmbedding = await getEmbedding(message);

    // 2. Retrieve relevant documents
    const relevantDocs = await retrieveDocuments(queryEmbedding, 3);
    const context = relevantDocs
      .map((doc, i) => `[Source ${i + 1}]\n${doc.content}`)
      .join('\n\n');

    // 3. Build the prompt
    const systemPrompt = `You are a helpful loan policy assistant for our bank/financial institution.
Answer questions about loan eligibility, EMI calculations, interest rates, application process, and policies.
Base your answers ONLY on the provided context. Be concise, friendly, and accurate.
If the context doesn't contain enough information, say so politely.
Format numbers in Indian currency (₹) where applicable.

Context from loan policy documents:
${context}`;

    // 4. Build message history for multi-turn conversation
    const messages = [
      ...conversationHistory.slice(-6), // Last 3 exchanges
      { role: 'user', content: message }
    ];

    // 5. Call Groq (Llama 3)
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.3, // Lower = more factual
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({
      reply,
      sources: relevantDocs.map(d => d.metadata),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}