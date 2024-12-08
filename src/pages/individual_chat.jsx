import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { isFormElement } from 'react-router-dom/dist/dom';
import io from 'socket.io-client'

function userChat() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [MessagesData, setMessagesData] = useState([]);
    const [reciverData, setReciverData] = useState(null);
    const reciver = useParams();
    const sender = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const socketIns = io(`${import.meta.env.VITE_API}/api/chat/individual`);

        socketIns.on('connect', () => {
            socketIns.emit('reciverUser', { sender: sender?.email, reciver: reciver?.email });
            socketIns.on('reciverUserData', (data) => {
                setReciverData(data?.data[0]);
            });
        });

        socketIns.emit('joinRoom', { sender: sender?.email, reciver: reciver?.email });

        socketIns.emit('fetchData', { sender: sender?.email, reciver: reciver?.email });

        setSocket(socketIns);

        socketIns.on('messageData', (data) => {
            const roomID = [sender?.email, reciver?.email].sort().join('&');
            if (roomID === data?.roomId) {
                setMessagesData(data?.data[0]?.messages);
            } else {
                console.log('reciver and data diffrent.')
            }
        })

        return () => {
            if (socketIns) {
                socketIns.emit('leaveRoom');
                socketIns.on('disconnect');
            }
        }

    }, [reciver?.email])



    const handleMsgButton = () => {
        message !== '' ? (socket.emit('sendMessage', {
            sender: sender?.email,
            reciver: reciver?.email,
            data: message
        }), setMessage('')) : console.log('enter msg')
        socket.emit('fetchData', { sender: sender?.email, reciver: reciver?.email })
    }

    return (
        <div className={`flex flex-col  min-h-[100vh]`}>
            <div className='min-h-[90vh] max-h-[90vh]'>
                <div className='text-xl drop-shadow-md shadow-md px-2 py-1 rounded-md '>
                    <span>{reciverData?.name}</span>
                </div>
                <ul className='flex flex-col space-y-1 p-3 max-h-[83vh] overflow-auto' >
                    {
                        MessagesData?.map((item, index) => (
                            <li key={index} className={`flex ${item?.senderId !== sender?.email ? 'self-start' : 'self-end'} rounded-[10px] bg-white px-3`}>
                                {item?.message}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='flex self-center justify-center space-x-5'>
                <input type='text' placeholder='Send Message' onChange={(e) => setMessage(e.target.value)} value={message} className='px-3 py-1 w-[40vw] rounded-md outline-none focus:shadow-md' />
                <button onClick={handleMsgButton} className='px-2 py-1 bg-gray-500 text-white rounded-md '>Send</button>
            </div>
        </div>
    )
}

export default userChat