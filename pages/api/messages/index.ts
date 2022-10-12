import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../interfaces';
import { messages } from '../../../data/messages';
import { MeetingRoom } from '@mui/icons-material';

type Data = 
| Message[]
| { message: string }

let messagesNow = messages;

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET':
            return getMessages(res)
        case 'DELETE':
            return deleteMessages(res)
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

function deleteMessages(res: NextApiResponse<Data>){
    messagesNow = [];
    return res.status(200).json( { message: 'The messages were deleted.'} );
}

function getMessages(res: NextApiResponse<Data>){
    return res.status(200).json( messagesNow );
}