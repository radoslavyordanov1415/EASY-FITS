import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch('http://localhost:5001/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                });

                if (response.ok) {

                    localStorage.removeItem('isAuthenticated');


                    navigate('/login');
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        handleLogout();
    }, [navigate]);

    return <h1>Logging out...</h1>;
}
