import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// Handle GET request
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT id, name, email, special_code FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const { name, email, special_code } = await req.json(); // Use req.json() to parse the body
    const [result]: any = await db.execute(
      'INSERT INTO users (name, email, special_code) VALUES (?, ?, ?)',
      [name, email, special_code || null]
    );
    return NextResponse.json({ id: result.insertId, name, email, special_code }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle PUT request (optional, if you need to update user)
export async function PUT(req: NextRequest) {
  try {
    const { id, name, email, special_code } = await req.json(); // Use req.json() to parse the body
    await db.execute(
      'UPDATE users SET name = ?, email = ?, special_code = ? WHERE id = ?',
      [name, email, special_code, id]
    );
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle DELETE request (optional, if you need to delete a user)
export async function DELETE(req: NextRequest) {
  try {
    // You can extract the query parameters directly from req.url
    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // Access query params like ?id=123

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
