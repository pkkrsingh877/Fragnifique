import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const { loggedInUser, updateProfile } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        isSeller: false
    });

    useEffect(() => {
        if (loggedInUser) {
            setFormData({
                name: loggedInUser.name || '',
                email: loggedInUser.email || '',
                isSeller: loggedInUser.isSeller || false
            });
        }
    }, [loggedInUser]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    

    const handleSubmit = async () => {
        const result = await updateProfile(formData); // You define this
        if (result.success) {
            navigate('/profile'); // or wherever you want to take them
        } else {
            console.error('Update failed:', result.error);
        }
    };

    if (!loggedInUser) {
        return <div className="p-8 text-center text-xl">Loading user data...</div>;
    }

    return (
        <div className="flex flex-col justify-start p-16 gap-y-2 text-palette-accent bg-palette-neutral text-center">
            <h1 className="font-heading text-xl">Update Profile</h1>

            <div className="flex flex-col justify-center items-center gap-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="NAME"
                    className="bg-palette-neutral text-palette-accent border p-4 outline-none"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL"
                    className="bg-palette-neutral text-palette-accent border p-4 outline-none"
                />
                <div className="mb-4">
                    <input
                        type="checkbox"
                        name="isSeller"
                        checked={formData.isSeller}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="isSeller" className="text-palette-accent">I AM A SELLER</label>
                </div>
                <button onClick={handleSubmit} className="bg-palette-accent text-palette-neutral p-4">
                    Update Profile
                </button>
            </div>
        </div>
    );
}
