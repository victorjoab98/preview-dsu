import mongoose from 'mongoose';

/**
* 0 = disconnected
* 1 = connected
* 2 = connecting
* 3 = disconnecting
*/

const mongoConnection = {
  isConnected: 0
}

export const connectToDatabase = async () => {  

  if ( mongoConnection.isConnected ) {    
    console.log('We were connected already');
    return;
  } 
  
  if ( mongoose.connections.length > 0 ) {   
    // Si hay mas conexiones, obtener la primera conexion, y el estado actual en la que esa conexion esta
    mongoConnection.isConnected = mongoose.connections[0].readyState;    

    if ( mongoConnection.isConnected === 1 ) { 
      console.log('using previous connection');
      return;
    }

    // evitar tener muchas conexiones simultaneas
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URL || '' );  
  mongoConnection.isConnected = 1;

  console.log('Connected to MongoDB:', process.env.MONGODB_URL)
}


export const disconnectDatabase = async () => {

  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConnected === 0) return;  

  await mongoose.disconnect();  
  mongoConnection.isConnected = 0;

  console.log('Disconnected from mongo');

}

