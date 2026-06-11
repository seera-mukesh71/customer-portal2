import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { customerId, password } = await request.json();

    // Find customer in database
    const result = await pool.query(
      'SELECT * FROM customers WHERE customer_id = $1',
      [customerId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid ID or password' },
        { status: 401 }
      );
    }

    const customer = result.rows[0];

    // Simple password check (plain text for now — see note below)
    if (customer.password_hash !== password) {
      return NextResponse.json(
        { error: 'Invalid ID or password' },
        { status: 401 }
      );
    }

    // Return the predicted number
    return NextResponse.json({
      success: true,
      customerId: customer.customer_id,
      predictedNumber: customer.predicted_number,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}