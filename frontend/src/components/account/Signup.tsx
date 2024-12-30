import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export default function Signup() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isSeller: false
    });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/users/signup`, user);
            if (response) {
                console.log('Signup successful:', response.data);
                navigate('/');
            } else {
                console.error('Signup failed:');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, isSeller: e.target.checked });
    };

    return (
        <div className="flex flex-col justify-start p-16 gap-y-2 text-palette-accent bg-palette-neutral text-center">
            <h1 className="font-heading text-xl">SIGNUP</h1>
            <p>Already have an account? <Link to="/account/login">Login</Link></p>

            <div className='flex flex-col justify-center items-center gap-4'>
                <input
                    type="text"
                    id="text"
                    name="name"
                    placeholder="NAME"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="EMAIL"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="PASSWORD"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <div className="mb-4">
                    <input
                        type="checkbox"
                        id="isSeller"
                        name="isSeller"
                        checked={user.isSeller}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <label htmlFor="isSeller" className="text-palette-accent">
                        I AM A SELLER
                    </label>
                </div>
                <button onClick={handleSubmit}
                    className="bg-palette-accent text-palette-neutral p-4">
                    SIGNUP
                </button>
            </div>
            <hr className='w-full' />
        </div>
    );
}