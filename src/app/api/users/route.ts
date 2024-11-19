import db from '@/lib/db'; // Use absolute imports if configured
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

type User = RowDataPacket & {
  id: number;
  name: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user'); // Extract 'user' from query parameters

  if (!user) {
    return NextResponse.json(
      { message: 'User parameter is required and should be a string' },
      { status: 400 }
    );
  }

  try {
    // Convert hyphenated user name (Test-User-5) into space-separated (Test User 5)
    const formattedUser = user.replace(/-/g, ' ');

    console.log('Formatted user for DB query:', formattedUser);

    // Query the database for the user with the formatted name
    const [rows]: [User[], unknown[]] = await db.query('SELECT * FROM users WHERE name = ?', [formattedUser]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error(error); // Log any errors for debugging
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
