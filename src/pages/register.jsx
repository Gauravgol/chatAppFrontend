import { useState } from 'react'
import Input from '../components/inputField'
import { register as Register } from '../functions/user.auth';
import { useNavigate } from 'react-router-dom';

function register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [Birthday, setBirthday] = useState('');
    const navigate = useNavigate();


    const handleRegistration = async () => {
        const fetch = await Register({ email: email, password: password, mobile: mobile, DOB: Birthday, username: username, name: name, });
        if (fetch.subcode === 201) {
            navigate('/');
            alert(fetch?.message);
        } else {
            alert(fetch?.message);
        }
    }

    return (
        <div className='flex w-[40%] m-auto mt-[10%] flex-col space-y-4 bg-gray-200 p-[3%] px-[5%] rounded-md justify-self-center	self-center	'>
            <h1 className='text-center font-semibold text-gray-600 text-xl'>Register User</h1>
            <Input type="text" placeholder="Enter User Name" onchange={setName} value={name} />
            <Input type="email" placeholder="Enter User Email" onchange={setEmail} value={email} />
            <Input type="text" placeholder="Enter username" onchange={setUsername} value={username} />
            <Input type="Number" placeholder="Enter User's Mobile Number" onchange={setMobile} value={mobile} />
            <Input type="date" placeholder="Enter Date Of Birth" onchange={setBirthday} value={Birthday} />
            <Input type="text" placeholder="Enter Password" onchange={setPassword} value={password} />
            <button onClick={handleRegistration} className='px-5 py-2 bg-white w-[30%] mx-auto rounded-md hover:bg-blue-400 hover:text-white' >Register</button>
        </div>
    )
}

export default register