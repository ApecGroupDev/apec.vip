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

    // Create the response with CORS headers
    const response = NextResponse.json(rows[0], { status: 200 });

    // Set CORS headers for the response
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your domain)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

    return response;
  } catch (error) {
    console.error(error); // Log any errors for debugging
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Optional: Handle preflight requests (OPTIONS)
export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 });

  // Set CORS headers for preflight requests
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
