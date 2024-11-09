// src/pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { RowDataPacket } from 'mysql2';

type User = RowDataPacket & {
  id: number;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
  const { user } = req.query; // Extract user from query params (e.g. Test-User-5)

  if (typeof user !== 'string') {
    return res.status(400).json({ message: 'User parameter is required and should be a string' });
  }

  try {
    // Convert hyphenated user name (Test-User-5) into space-separated (Test User 5)
    const formattedUser = user.replace(/-/g, ' ');

    console.log('Formatted user for DB query:', formattedUser);

    // Query the database for the user with the formatted name
    const [rows]: [User[], any] = await db.query('SELECT * FROM users WHERE name = ?', [formattedUser]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
