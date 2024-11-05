// src/pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { RowDataPacket } from 'mysql2'; // Importing RowDataPacket

// Define the User type extending RowDataPacket
type User = RowDataPacket & {
  id: number;
  name: string;
};

// Define the API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | { message: string }>) {
  try {
    // Execute the query and destructure the result
    const [rows]: [User[], any] = await db.query('SELECT * FROM users');
    
    res.status(200).json(rows);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
