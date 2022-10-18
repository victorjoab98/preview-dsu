import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';

interface Data {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production' ) {
    res.status(401).json({ message: 'Not allowed' });
    return;
  }

  await db.connectToDatabase();
  await db.disconnectDatabase();

  res.status(200).json({ message: 'Seeders were inserted successfuly.' });
}
