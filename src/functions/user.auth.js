const register = async ({ name, username, email, DOB, mobile, password }) => {
    try {
        console.log("🚀 Vite Env Object:", import.meta.env);
        console.log("🚀 API URL:", import.meta.env.VITE_API);
        if (email === '' && password === '') {
            return alert('Please enter email && password');
        }
        const apiRequset = await fetch(`${import.meta.env.VITE_API}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, username, DOB, mobile, password }),
        });
        const response = await apiRequset.json();
        if (!apiRequset.ok) {
            return response;
        }

        return response;
    } catch (error) {
        console.error('catch', error)
    }
}

const login = async ({ email, password }) => {
    try {
        if (email === '' && password === '') {
            return alert('Please enter email && password');
        }
        const apiRequset = await fetch(`${import.meta.env.VITE_API}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const response = await apiRequset.json();
        if (!apiRequset.ok) {
            return response;
        }
        return response;
    } catch (error) {
        console.error('catch', error)
    }

}

const GetUsers = async () => {
    try {
        const req = await fetch(`${import.meta.env.VITE_API}/api/users`, {
            method: 'GET',
        });
        const response = await req.json();
        if (!req.ok) {
            console.error(response)
        }
        return response;
    } catch (error) {
        console.log('An error occurred: ', error);
    }
}

const UpdateUser = async ({ name, email, mobile, DOB }) => {
    try {
        const req = await fetch(`${import.meta.env.VITE_API}/api/users`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, mobile, DOB })
        })
        const response = await req.json();
        if (!req.ok) {
            console.error(response)
        }
        return response;

    } catch (error) {
        console.log('An error occurred: ', error);
    }
}

const DeleteUser = async ({ email }) => {
    try {
        const req = await fetch(`${import.meta.env.VITE_API}/api/users`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        const response = await req.json();
        if (!req.ok) {
            console.error(response)
        }
        return response;
    }
    catch (error) {
        console.log('An error occurred to delete user : ', error);
    }
}

export { register, login, GetUsers, UpdateUser, DeleteUser }