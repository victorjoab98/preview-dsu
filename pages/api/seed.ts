import { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { User, Message, ToDo } from '../../models';

interface Data {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production' ) {
    res.status(401).json({ message: 'This route is not allowed in production' });
    return;
  }

  try {
    await db.connectToDatabase();

    await Promise.all([
      User.deleteMany(),
      Message.deleteMany(),
      ToDo.deleteMany()
    ])
    
    await Promise.all([
      User.insertMany( seedData.users),
      Message.insertMany( seedData.messages ),
      ToDo.insertMany( seedData.todos ),
    ]);

    await db.disconnectDatabase();
    res.status(200).json({ message: 'Seeders were inserted successfuly.' });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wront, contact your admin' });
      
    }
    
    



}
