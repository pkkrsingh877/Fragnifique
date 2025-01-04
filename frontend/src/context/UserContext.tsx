import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;

// Define types for User and Context
interface User {
    _id: string;
    name: string;
    email: string;
    isSeller: boolean;
}

interface UserContextType {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (user: LoginUser) => Promise<LoginResponse>;
    signup: (user: SignupUser) => Promise<SignupResponse>;
    verifyToken: () => Promise<boolean>;
    logout: () => void; // Add logout method type
}

interface LoginUser {
    email: string;
    password: string;
}

interface SignupUser {
    name: string;
    email: string;
    password: string;
    isSeller?: boolean;
}

interface LoginResponse {
    success: boolean;
    error?: unknown;
}

interface SignupResponse {
    success: boolean;
    error?: unknown;
}

// Create Context
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const login = async (user: LoginUser): Promise<LoginResponse> => {
        try {
            const response = await axios.post<any>(`/api/users/login`, user);
            if (response) {
                const { _id, name, email, isSeller } = response.data.data;
                setLoggedInUser({ _id, name, email, isSeller });
                return { success: true };
            }
        } catch (error) {
            return { success: false, error };
        }
        return { success: false, error: 'Unknown error' };
    };

    const signup = async (user: SignupUser): Promise<SignupResponse> => {
        try {
            const response = await axios.post<any>(`/api/users/signup`, user);
            if (response) {
                const { _id, name, email, isSeller } = response.data.data;
                setLoggedInUser({ _id, name, email, isSeller });
                return { success: true };
            }
        } catch (error) {
            return { success: false, error };
        }
        return { success: false, error: 'Unknown error' };
    };

    const verifyToken = async (): Promise<boolean> => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get<any>(`/api/users/verifyToken`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token if necessary
                }
            });
            if (response && response.data.success) {
                // If the token is valid, you can set the user in state
                const { _id, name, email, isSeller } = response.data.data;
                setLoggedInUser({ _id, name, email, isSeller });
                return true;
            }
        } catch (error) {
            return false;
        }
        return false;
    };

    // Logout method
    const logout = () => {
        // Remove the token from cookies
        Cookies.remove('token');

        // Clear the loggedInUser state
        setLoggedInUser(null);

        // Optionally, redirect user (if using react-router)
        // For example, you can use the `useNavigate` hook if needed.
        // navigate('/account/login');
    };

    // Using useEffect to run verifyToken when the component mounts
    useEffect(() => {
        if (!loggedInUser) {
            verifyToken(); // Verify token only if the user is not already logged in
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser, login, signup, verifyToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('UserContextProvider is missing!');
    }
    return context;
};
