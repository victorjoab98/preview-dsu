import moongose from 'mongoose';

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

const mongoConnections = {
    isConnected: 0
}

export const connectToDatabase = async () => {
    if (mongoConnections.isConnected) {
        console.log('Using existing database connection');
        return;
    }

    if( moongose.connections.length > 0 ) {
        mongoConnections.isConnected = moongose.connections[0].readyState;
        
        if (mongoConnections.isConnected === 1) {
            console.log('Using existing database connection');
            return;
        }

        await moongose.disconnect();
    }

    await moongose.connect( process.env.MONGODB_URL || '' );
    mongoConnections.isConnected = 1;
    console.log('Using new database connection');
}

export const disconnectDatabase = async () => {
    if (mongoConnections.isConnected === 0) {
        return;
    }
    mongoConnections.isConnected = 0;
    console.log('Database connection closed');
    await moongose.disconnect();
}