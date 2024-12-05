import db from '@/lib/db'; // Use absolute imports if configured
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

type Quote = RowDataPacket & {
  id: number;
  name: string;
  description: string;
  user_id: number;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId'); // Extract 'userId' from query parameters

  if (!userId) {
    return NextResponse.json(
      { message: 'userId parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Query to fetch quotes by user_id
    const [rows]: [Quote[], unknown[]] = await db.query('SELECT * FROM quotes WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'No quotes found for this user' }, { status: 404 });
    }

    // Create the response with CORS headers
    const response = NextResponse.json(rows, { status: 200 });

    // Set CORS headers for the response
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your domain)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

    return response;
  } catch (error) {
    console.error(error);
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
