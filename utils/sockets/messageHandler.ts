import { db } from '../../database';

import { MessageModel } from '../../models';

export const handleMessage = (socket: any, io: any) => {

    
    const createMessage = async (payload: string) => {
    
        await db.connectToDatabase();

        const message = new MessageModel(payload);

        await message.save();
        
        await db.disconnectDatabase();

        io.emit('newMessage', payload);
    } 

    socket.on('createMessage', createMessage);
}
