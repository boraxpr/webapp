import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // uid SERIAL PRIMARY KEY,
  // first_name VARCHAR(255),
  // last_name VARCHAR(255),
  // created_on TIMESTAMP,
  // is_active BOOLEAN,
  // updated_on TIMESTAMP,
  // email VARCHAR(255)
  const uid = searchParams.get('uid');
  const first_name = searchParams.get('first_name');
  const last_name = searchParams.get('last_name');
  const created_on = searchParams.get('created_on');
  const is_active = searchParams.get('is_active');
  const updated_on = searchParams.get('updated_on');
  const email = searchParams.get('email');

  try {

    await sql`
    INSERT INTO users (Uid, first_name, last_name, created_on, is_active, updated_on, email) 
    VALUES (${uid}, ${first_name},${last_name},${created_on},${is_active},${updated_on},${email});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}