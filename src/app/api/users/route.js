import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { admin } from '@/components/firebase/firebase-admin';
export async function GET(request) {
  const token = request.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Extract the token from the 'Authorization' header
  const tokenValue = token.replace('Bearer ', '');

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(tokenValue);
    // if token is invalid, throw an error
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    // The token is valid; the user is authenticated
    // const uid = decodedToken.uid;

    // You can now use 'uid' or other user information to perform database queries or other operations
    // For example, fetch user-specific data
    const result = await sql`SELECT * FROM users`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
