import db from '@/lib/db'; // Use absolute imports if configured
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

type Project = RowDataPacket & {
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
    // Query to fetch projects by user_id
    const [rows]: [Project[], unknown[]] = await db.query('SELECT * FROM projects WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'No projects found for this user' }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
