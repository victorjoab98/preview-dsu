import { Server } from 'socket.io';
import { handleMessage } from '../../utils/sockets/';

export default function SocketHandler(req:any, res:any) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    cors: {
      origin: ['http://localhost:3000/'],
      methods: ['POST', 'GET']
    }
  });
  
  res.socket.server.io = io;

  const onConnection = (socket: any) => {
    handleMessage(socket,io)
  };

  io.on('connection', onConnection);

  console.log('Setting up socket');
  res.end();
}