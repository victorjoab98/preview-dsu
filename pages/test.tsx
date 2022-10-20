import { useEffect } from 'react';
import { io } from 'socket.io-client';



const socket = io('http://localhost:8080/');


const TestPage = () => {

    useEffect(() => {
        
        socket.on('send-message-server', ( payload ) => {
            console.log('estoy en send-message-server',payload)
        })
        

    }, []);

  return (
    <div>
        <button onClick={() => {
            socket.emit('send-message', {data: "HOlaaaaaaa"}, ( id:any ) => {
                console.log('from my server', id)
            });
        }}></button>
    </div>
  )
}
export default TestPage