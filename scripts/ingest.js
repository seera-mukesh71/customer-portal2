require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const { HfInference } = require('@huggingface/inference');
const loanDocuments = require('./loan-documents');

// ── Config ─────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// ── Generate embedding for a text ──────────────────────────────────
async function getEmbedding(text) {
  const result = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2', // Free, 384-dim
    inputs: text,
  });
  // Result is a 2D array — take mean pooling
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

// ── Main ingestion ──────────────────────────────────────────────────
async function ingestDocuments() {
  console.log('🚀 Starting document ingestion...');

  // Clear existing documents
  await pool.query('DELETE FROM loan_documents');
  console.log('🗑️  Cleared existing documents');

  for (let i = 0; i < loanDocuments.length; i++) {
    const doc = loanDocuments[i];
    console.log(`📄 Processing document ${i + 1}/${loanDocuments.length}: ${doc.metadata.topic}`);

    try {
      const embedding = await getEmbedding(doc.content);
      const vectorString = `[${embedding.join(',')}]`;

      await pool.query(
        `INSERT INTO loan_documents (content, metadata, embedding) 
         VALUES ($1, $2, $3)`,
        [doc.content, JSON.stringify(doc.metadata), vectorString]
      );

      console.log(`   ✅ Embedded and stored`);

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`   ❌ Error on doc ${i + 1}:`, err.message);
    }
  }

  console.log('\n✅ All documents ingested successfully!');
  await pool.end();
}

ingestDocuments().catch(console.error);