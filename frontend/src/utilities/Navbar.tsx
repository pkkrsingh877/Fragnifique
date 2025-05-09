import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loggedInUser, logout } = useUserContext();

    return (
        <div className='flex flex-col shadow-highlight'>
            <nav className="flex justify-between items-center p-4 bg-palette-primary text-palette-neutral">
                {/* Hamburger Button (Visible on mobile by default) */}
                <div className="" onClick={() => setIsOpen(!isOpen)}>
                    <button className="text-xl">☰</button>
                </div>

                {/* App Name (Centered on mobile and desktop) */}
                <div className="flex justify-center flex-1">
                    <Link to="/" className="text-xl">
                        FRAGNIFIQUE
                    </Link>
                </div>

                {/* Cart Link (Always visible on mobile and desktop) */}
                <div className="flex items-center">
                    <Link to="/cart" className="ml-4">
                        CART
                    </Link>
                </div>
            </nav>
            {/* Mobile Links (Hidden by default, shown when hamburger is clicked) */}
            <div className={`${isOpen ? 'block' : 'hidden'} w-full p-4 text-center top-full`}>
                <Link to="/products" className="block mb-4" onClick={() => setIsOpen(false)}>PRODUCTS</Link>
                <Link to="/profile" className="block mb-4" onClick={() => setIsOpen(false)}>PROFILE</Link>
                <Link to="/about" className="block mb-4" onClick={() => setIsOpen(false)}>ABOUT</Link>
                {loggedInUser ? (
                    // Add onClick handler for logout
                    <Link to="/" className="block mb-4" onClick={() => { logout(); setIsOpen(false); }}>LOGOUT</Link>
                ) : (
                    <>
                        <Link to="/account/login" className="block mb-4" onClick={() => setIsOpen(false)}>LOGIN</Link>
                        <Link to="/account/signup" className="block mb-4" onClick={() => setIsOpen(false)}>SIGNUP</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
