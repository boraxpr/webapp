import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE users (
        uid SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        created_on TIMESTAMP,
        is_active BOOLEAN,
        updated_on TIMESTAMP,
        email VARCHAR(255)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}