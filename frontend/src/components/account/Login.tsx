import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const { login } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const result = await login(user);
        if (result.success) {
            navigate('/');
        } else {
            console.error('Login failed:', result.error);
        }
    };

    return (
        <div className="flex flex-col justify-start p-16 gap-y-2 text-palette-accent bg-palette-neutral text-center">
            <h1 className="font-heading text-xl">LOGIN</h1>
            <p>Don't have an Account? <Link to="/account/signup">Create Account</Link></p>

            <div className='flex flex-col justify-center items-center gap-4'>
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
                <button onClick={handleSubmit}
                    className="bg-palette-accent text-palette-neutral p-4">
                    Login
                </button>
            </div>
            <hr className='w-full' />
        </div>
    );
}