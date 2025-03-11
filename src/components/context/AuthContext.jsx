import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5001/auth/status', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5001/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsLoggedIn(false);
            navigate('/');
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
