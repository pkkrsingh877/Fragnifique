import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { loggedInUser } = useUserContext();

    if (!loggedInUser) {
        return <div className="p-8 text-center text-xl">Loading user info...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4 p-8 bg-palette-primary text-palette-highlight">
            <h1 className="text-3xl font-bold">User Info</h1>
            <p className="text-lg">
                <strong>Name:</strong> {loggedInUser.name}
            </p>
            <p className="text-lg">
                <strong>Email:</strong> {loggedInUser.email}
            </p>
            <p className="text-lg">
                <strong>Role:</strong> {loggedInUser.isSeller ? 'Seller 🛍️' : 'Customer 🙋‍♂️'}
            </p>
            <Link to="/profile/update" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">Update Profile</Link>
        </div>
    );
}
