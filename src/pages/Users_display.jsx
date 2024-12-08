import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUsers, UpdateUser, DeleteUser } from '../functions/user.auth'

function UsersData() {
    const [usersData, setUsersData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState({ email: '', name: '', mobile: '', DOB: '' });
    const [updateUserID, setupdateUserID] = useState(null);
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const fetch = async () => {
            const response = await GetUsers();
            setUsersData(response?.data?.user)
        }
        fetch();
        setUpdate(false)
    }, [update])

    const handleUpdateUser = async (email, name, mobile, DOB) => {
        try {
            let userEmail = userData?.email === '' ? email : userData?.email;
            let userName = userData?.name === '' ? name : userData?.name;
            let userMobile = userData?.mobile === '' ? mobile : userData?.mobile;
            let userDob = userData?.DOB === '' ? DOB : userData?.DOB;

            const updateUser = await UpdateUser({ email: userEmail, name: userName, mobile: userMobile, DOB: userDob });
            alert(updateUser?.message)
            setUpdate(true);
            setupdateUserID(null);
            setUserData({ email: '', name: '', mobile: '', DOB: '' });
        } catch (error) {
            console.error("an error is encountered while updating user : ", error);
        }
    }

    const handleDeleteUser = async (email) => {
        try {
            const confirmByUser = confirm(`Are you sure you want to delete`)
            if (confirmByUser) {
                const deleteRequest = await DeleteUser({ email });
                setUpdate(true);
            }
        } catch (error) {
            console.error('an error is encountered while deleting users: ', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleChatButton = (email) => {
        navigate(`/chat/${email}`);
    };

    return (
        <div>
            <table className='flex flex-col w-full justify-center px-5 py-10'>
                <thead>
                    <tr className='flex justify-between space-x-10 border-b-2 px-[5rem] py-2'>
                        <th className='text-center w-1/7'>Name</th>
                        <th className='text-center w-1/7'>Email</th>
                        <th className='text-center w-1/7'>userName</th>
                        <th className='text-center w-1/7'>DOB</th>
                        <th className='text-center w-1/7'>Mobile</th>
                        <th className='text-center w-1/7'>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    usersData.length > 0 ? (
                        usersData.map((user, index) => (
                            <tr key={index} className={`flex justify-between space-x-10 border-b-2 px-[5rem] py-2 rounded-md hover:shadow-md w-full max-w-[100vw] ${updateUserID === user?.email ? 'shadow-md' : ''}`}>
                                <td className='text-center w-1/10'>
                                    <input tye='text' name='name'
                                        value={updateUserID === user?.email ? userData?.name : user?.name}
                                        placeholder={user?.name || '-'}
                                        onChange={handleChange}
                                        disabled={updateUserID === user?.email ? false : true}
                                        className={`px-2 py-1 ${updateUserID === user?.email ? "bg-gray-100 border-b-2 border-blue-400 outline-none w-1/7" : ''}`}
                                    />
                                </td>
                                <td className='text-center w-1/7'>
                                    <input tye='text' name='email'
                                        value={updateUserID === user?.email ? userData?.email : user?.email}
                                        placeholder={user?.email || '-'}
                                        onChange={handleChange}
                                        disabled={updateUserID === user?.email ? false : true}
                                        className={`px-2 py-1 ${updateUserID === user?.email ? "bg-gray-100 border-b-2 border-blue-400 outline-none w-1/7" : ''}`}
                                    />

                                </td>
                                <td className='text-center w-1/7'>
                                    {user?.username || '-'}
                                </td>
                                <td className='text-center w-1/7'>
                                    <input tye='text' name='DOB'
                                        value={updateUserID === user?.email ? userData?.DOB : user?.DOB}
                                        placeholder={user?.DOB || '-'}
                                        onChange={handleChange}
                                        disabled={updateUserID === user?.email ? false : true}
                                        className={`px-2 py-1 ${updateUserID === user?.email ? "bg-gray-100 border-b-2 border-blue-400 outline-none " : ''}`}
                                    />

                                </td>
                                <td className='text-center w-1/7'>
                                    <input tye='text' name='mobile'
                                        value={updateUserID === user?.email ? userData?.mobile : user?.mobile_number}
                                        placeholder={user?.mobile_number || '-'}
                                        onChange={handleChange}
                                        disabled={updateUserID === user?.email ? false : true}
                                        className={`px-2 py-1 ${updateUserID === user?.email ? "bg-gray-100 border-b-2 border-blue-400 outline-none w-1/7" : ''}`}
                                    />

                                </td>
                                <td className='flex space-x-2 text-center justify-center w-1/7'>
                                    {
                                        updateUserID === user?.email ? <button className='px-2 py-1 hover:shadow-blue-400 hover:shadow-sm rounded-md' onClick={() => { user?.email && handleUpdateUser(user?.email, user?.name, user?.mobile_number, user?.DOB) }}>Update</button> : <button className='px-2 py-1 hover:shadow-blue-400 hover:shadow-sm rounded-md' onClick={() => setupdateUserID(user?.email)}>Edit</button>
                                    }
                                    <button className='px-2 py-1 hover:shadow-blue-400 hover:shadow-sm rounded-md' onClick={() => user?.email && handleDeleteUser(user.email)}>Delete</button>
                                    {
                                        loggedUser?.email !== user?.email ?
                                            <button className='px-2 py-1 hover:shadow-blue-400 hover:shadow-sm rounded-md' onClick={() => user?.email && handleChatButton(user.email)}>Chat</button>
                                            : ''

                                    }

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No users found.</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div >
    )
}

export default UsersData



