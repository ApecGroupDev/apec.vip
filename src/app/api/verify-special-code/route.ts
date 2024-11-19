import db from '@/lib/db'; // Adjust the import path as per your folder structure
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

// Define the type for the rows returned by the query
interface UserRow extends RowDataPacket {
  special_code: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');
  const special_code = url.searchParams.get('special_code');

  if (!user || !special_code) {
    return NextResponse.json(
      { message: 'Invalid request parameters' },
      { status: 400 }
    );
  }

  try {
    // Query the database for the user and special_code
    const [rows]: [UserRow[], unknown] = await db.query(
      'SELECT special_code FROM users WHERE name = ?',
      [user]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const dbSpecialCode = rows[0].special_code;

    if (special_code === dbSpecialCode) {
      return NextResponse.json(
        { message: 'Special code is valid' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid special code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
