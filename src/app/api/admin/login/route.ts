import { NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken'; // Import JWT to generate a token

export async function POST(req: Request) {
  try {
    const { masterCode } = await req.json();

    // Query the database to get the master_code
    const [rows] = await db.query<any[]>(
      'SELECT master_code FROM config WHERE id = 2'
    );

    // If no matching rows are found, return an error
    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'Code not found in database.' }, { status: 404 });
    }

    // Access the master_code from the first row
    const correctCode = rows[0].master_code;

    // Compare the provided code with the stored one
    if (masterCode === correctCode) {
      // Generate a token if the code matches
      const token = jwt.sign(
        { user: 'admin' }, // Payload data, can be expanded with more info
        process.env.JWT_SECRET || 'your-secret-key', // Secret key for signing the token
        { expiresIn: '1h' } // Token expiration (e.g., 1 hour)
      );

      return NextResponse.json({ success: true, token }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Incorrect master code.' }, { status: 401 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error validating master code.', error: errorMessage }, { status: 500 });
  }
}
