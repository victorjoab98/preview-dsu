import { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../../database';
import { UserModel, MessageModel, ToDoModel } from '../../../models';

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
      UserModel.deleteMany(),
      MessageModel.deleteMany(),
      ToDoModel.deleteMany()
    ])
    
    await Promise.all([
      UserModel.insertMany( seedData.users),
      MessageModel.insertMany( seedData.messages ),
      ToDoModel.insertMany( seedData.todos ),
    ]);

    await db.disconnectDatabase();
    res.status(200).json({ message: 'Seeders were inserted successfuly.' });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wront, contact your admin' });      
    }
}
