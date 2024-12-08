import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function sidebar({ userData, roomData, AddNewRoomFun }) {
    const [roomName, setRoomName] = useState('')
    const [addNewUser, setAddNewUser] = useState(false);
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    const handleCreateButton = () => {
        if (roomName !== '' || null) {
            AddNewRoomFun({ name: roomName, creater: loggedUser?.email });
            setRoomName('');
        }
    }

    return (
        <div >
            <ul>
                <ul className='flex w-full text-gray-900 my-2 text-md bg-gray-400 py-1 px-1 border-b-2 justify-between '>

                    <li> {loggedUser?.user_name}</li>
                    <li className='flex justify-self-end'>
                        {/* <button type="button" onClick={() => setAddNewUser(!addNewUser)} className=" flex self-end mx-2">Create New</button> */}
                    </li>
                </ul>
                {
                    userData?.map((item, index) => (
                        <Link key={index} to={`${item}`}>
                            <li className='flex px-2 py-1 sm:text-sm md:text-md xl:text-md border rounded-md my-1 cursor-pointer active:bg-white hover:shadow-sm hover:shadow-white '>
                                {item}
                            </li>
                        </Link>
                    ))
                }
                <ul className='flex w-full text-gray-900 my-2 text-md bg-gray-400 py-2 px-1 border-b-2 justify-between items-center'>
                    <li> {addNewUser ?
                        <input type="text" placeholder="Please Enter Room Name"
                            className='rounded-md px-2 py-1 w-[85%] outline-none focus:shadow-sm focus:shadow-white'
                            onChange={(e) => setRoomName(e.target.value)} /> : <span className=' flex text-gray-600 font-semibold'>Groups</span>}
                    </li>
                    <li className='flex justify-self-end'>
                        <button type="button" onClick={() => { (addNewUser && handleCreateButton()), setAddNewUser(!addNewUser) }}
                            className=" flex sm:text-sm md:text-md xl:text-md self-end mx-2 align-center py-1 px-2 py-1 rounded-md bg-gray-500 text-white border-t-2 hover:border-b-2 hover:border-t-0"
                        >{addNewUser ? "Add" : "Create New"}</button>
                    </li>
                </ul>
                {
                    roomData?.map((item, index) => (
                        <Link key={index} to={`${item?.room_name}/${loggedUser?.email}`}>
                            <li className='flex px-2 py-1 sm:text-sm md:text-md xl:text-md border rounded-md my-1 cursor-pointer active:bg-white hover:shadow-sm hover:shadow-white '>
                                {item?.room_name}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default sidebar  