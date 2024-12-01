import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from Bearer header

    if (!token) {
      return NextResponse.json({ message: 'No token provided.' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    jwt.verify(token, secret); // Verify the token

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 401 });
  }
}
