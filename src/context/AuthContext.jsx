import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({
    user: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/user');
                    setUser(response.data);
                } catch (error) {
                    console.error('Auth check failed', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        console.log("Sending request", {email, password})
        const response = await api.post('/login', { email, password });
        console.log(response.data)
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
