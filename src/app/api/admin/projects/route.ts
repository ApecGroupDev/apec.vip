import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// Handle GET request
export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        id, 
        user_id, 
        name, 
        description, 
        start_date, 
        end_date, 
        status 
      FROM projects
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const { user_id, name, description, start_date, end_date, status } = await req.json();

    // Validate required fields
    if (!user_id || !name) {
      return NextResponse.json({ message: 'user_id and name are required' }, { status: 400 });
    }

    const [result]: any = await db.execute(
      `
      INSERT INTO projects (user_id, name, description, start_date, end_date, status) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        name,
        description || null,
        start_date || null,
        end_date || null,
        status || 'active',
      ]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        user_id,
        name,
        description,
        start_date,
        end_date,
        status: status || 'active',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle PUT request (update project)
export async function PUT(req: NextRequest) {
  try {
    const { id, user_id, name, description, start_date, end_date, status } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    await db.execute(
      `
      UPDATE projects 
      SET user_id = ?, name = ?, description = ?, start_date = ?, end_date = ?, status = ? 
      WHERE id = ?
      `,
      [user_id, name, description, start_date, end_date, status, id]
    );

    return NextResponse.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle DELETE request
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
