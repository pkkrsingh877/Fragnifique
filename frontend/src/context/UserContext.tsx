import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
            const response = await axios.post(`${apiBaseUrl}/api/users/login`, user);
            if (response) {
                console.log('Login successful:', response.data);
                const { _id, name, email, isSeller } = response.data.data;
                setLoggedInUser({ _id, name, email, isSeller });
                console.log(loggedInUser)
                return { success: true };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error };
        }
        return { success: false, error: 'Unknown error' };
    };

    const signup = async (user: SignupUser): Promise<SignupResponse> => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/users/signup`, user);
            if (response) {
                console.log('Signup successful:', response.data);
                const { _id, name, email, isSeller } = response.data;
                setLoggedInUser({ _id, name, email, isSeller });
                return { success: true };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error };
        }
        return { success: false, error: 'Unknown error' };
    };

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser, login, signup }}>
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
