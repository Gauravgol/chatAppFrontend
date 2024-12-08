import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import io from 'socket.io-client';

function DashboardChat() {
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [socket, setSocket] = useState(null);
    const loggedUser = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const socketIns = io(`${import.meta.env.VITE_API}/api/init`);
        setSocket(socketIns);

        const user = JSON.parse(localStorage.getItem('user'));
        socketIns.on('connect', () => {
            socketIns.emit('currentUser', { sender: user?.email });
        });

        socketIns.on('fetchUserList', (data) => {
            let listData = [];
            data.forEach(item => {
                const userCheck = item?.sender === user?.email;
                if (userCheck) {
                    listData.push(item?.reciver);
                } else {
                    listData.push(item?.sender);
                }
            });
            setUserList(listData);
        })

        socketIns.on('roomList', (data) => {
            setRoomList(data);
            // console.log(data)
        });

    }, [loggedUser?.email])

    const AddNewRoom = ({ name, creater }) => {
        if (socket) {
            socket.emit('newRoom', { roomName: name, creater: creater });
        }
    }


    return (
        <div className='flex space-x-0 text-gray-700 min-h-[100vh]'>
            <div className='w-1/4 p-2 bg-gray-400' >
                <Sidebar userData={userList} roomData={roomList} AddNewRoomFun={AddNewRoom} />
            </div>
            <div className='w-3/4  bg-gray-200'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardChat;