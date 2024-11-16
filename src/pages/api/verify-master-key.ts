import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import { RowDataPacket } from 'mysql2';

// Define the type for the row structure returned by the query
interface ConfigRow extends RowDataPacket {
  master_code: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { master_code } = req.query;

  if (typeof master_code !== 'string') {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    // Query the config table for the master_code
    const [configRows]: [ConfigRow[], unknown] = await db.query('SELECT master_code FROM config WHERE id = 1');

    if (configRows.length === 0) {
      return res.status(404).json({ message: 'Config not found' });
    }

    const dbMasterCode = configRows[0].master_code;

    // Check if the entered master_code matches
    if (master_code === dbMasterCode) {
      return res.status(200).json({ message: 'Master code is valid' });
    } else {
      return res.status(400).json({ message: 'Invalid master code' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
