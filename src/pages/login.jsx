import { useState } from 'react';
import Input from '../components/inputField';
import { login } from '../functions/user.auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const fetch = await login({ email, password });
        if (fetch?.subcode === 200) {
            localStorage.setItem('user', JSON.stringify(fetch?.data));
            navigate('/users');
            alert(fetch?.message);
        } else {
            fetch && alert(fetch?.message);
        }
    }

    return (
        <div className='flex w-[40%] m-auto mt-[10%] flex-col space-y-4 bg-gray-200 p-[3%] px-[5%]  rounded-md justify-self-center	self-center	'>
            <h1 className='text-center font-semibold text-gray-600 text-xl'>Login User</h1>
            <Input type="text" placeholder="Enter User Email" onchange={setEmail} value={email} />
            <Input type="text" placeholder="Enter Password" onchange={setPassword} value={password} />
            <button onClick={handleLogin} className='px-5 py-2 bg-white w-[30%] mx-auto rounded-md hover:bg-blue-400 hover:text-white' >Login</button>
        </div>
    )
}

export default Login