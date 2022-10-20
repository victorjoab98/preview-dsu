import type { NextApiResponse } from 'next';

import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

import { Server } from 'socket.io';

interface SocketServer extends HTTPServer {
  io: Server
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseSocket extends NextApiResponse {
  socket: SocketWithIO
}
