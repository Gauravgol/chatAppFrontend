import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

function Room() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [msgData, setMsgData] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const Params = useParams();

    useEffect(() => {
        const socketIns = io('http://localhost:3000/api/chat/groups');
        setSocket(socketIns);

        socketIns.on('connect', () => {
            // connect to room which is passed in params
            socketIns.emit('joinRoom', { roomId: Params?.group });
            socketIns.emit('fetchRoomMessage')
        });

        socketIns.on('msg', (data) => {
            setMsgData(data?.data);
        })



        socketIns.on('fetcher', (data) => {
            setMsgData(data);
        })

        return () => {
            if (socketIns) {
                socketIns.emit('leaveRoom');
                socketIns.on('disconnect', () => console.log('user disconnected. socket Id: ', socketIns.id));
            }
        }

    }, [Params?.group])

    const handleSendButton = () => {
        if (message !== '' || null && socket) {
            socket.emit('sendMessage', { roomName: Params?.group, user: { name: loggedUser?.user_name, email: loggedUser?.email, time: Date.now() }, message: message, time: Date.now() });
            socket.emit('fetchRoomMessage');
            setMessage('')
        }
    }

    return (
        <div className='flex' >
            <div className='flex flex-col h-full w-full'>
                <ul className='flex space-x-3 px-4'>
                    <h1 className='pl-4 pt-1 text-2xl text-gray-700 self-end font-semibold'>{Params?.group}</h1>
                    {
                        msgData[0]?.users?.map((user, index) => (
                            <li key={index} className="flex self-end text-gray-500 ">
                                {user?.user_name}
                            </li>
                        ))
                    }
                </ul>
                <div className='flex flex-col bg-gray-100 px-10 py-5 align-self-top max-h-[93vh] '>
                    <ul className='flex flex-col max-h-[90vh] overflow-auto min-h-[80vh] snap-start'>
                        {msgData[0]?.messages?.map((item, index) => (
                            <li className={`flex  my-1 text-md text-gray-900 px-4 py-1  ${item?.sender === loggedUser?.email ? 'justify-end' : "text-start"}`} key={index}>
                                <p className={`bg-blue-200 w-auto pl-4 pr-5 pt-1 rounded-[30px] `}>{item?.message}<span className={`text-[0.8rem] text-gray-500 grid ${item?.sender === loggedUser?.email ? 'hidden' : 'visible'} `} >{item?.sender}</span></p>
                            </li>
                        ))}
                    </ul>
                    <div className='flex wi-full justify-center  align-self-bottom w-full space-x-4'>
                        <input className='w-[30%] px-5 py-3 rounded-md' type="text" placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className='w-auto text-center bg-gray-500 text-white px-5 py-3 rounded-md' type="button" onClick={handleSendButton}>send</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Room