import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { RowDataPacket } from 'mysql2';

// Define the type for the rows returned by the query
interface UserRow extends RowDataPacket {
  special_code: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, special_code } = req.query;

  if (typeof user !== 'string' || typeof special_code !== 'string') {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    // Query the database for the user and special_code
    const [rows]: [UserRow[], unknown] = await db.query('SELECT special_code FROM users WHERE name = ?', [user]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const dbSpecialCode = rows[0].special_code;

    if (special_code === dbSpecialCode) {
      return res.status(200).json({ message: 'Special code is valid' });
    } else {
      return res.status(400).json({ message: 'Invalid special code' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
