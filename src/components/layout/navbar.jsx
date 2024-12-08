import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'

function navbar() {
    const location = useLocation();
    const pathName = location?.pathname;

    useEffect(() => {
    }, [pathName])
    return (
        <nav>
            <ul className='flex justify-end space-x-8 px-[50px] py-4 shadow-md '>
                {
                    (location.pathname === '/' || location.pathname === '/register') ? (location.pathname === '/' ?
                        <Link to={'/register'}>
                            <li className='border-2 px-3 py-1 rounded-md hover:bg-blue-400 hover:text-white hover:border-blue-400 cursor-pointer'>Register</li>
                        </Link> :
                        <Link to={'/'}>
                            <li className='border-2 px-3 py-1 rounded-md hover:bg-blue-400 hover:text-white hover:border-blue-400 cursor-pointer'>Login</li>
                        </Link>) :
                        ''
                }
            </ul>
        </nav>
    )
}

export default navbar