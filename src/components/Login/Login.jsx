import React, { useState } from 'react';
import './Login.css'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            alert('Login successful!');
            window.location.href = '/';

        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn-submit">Login</button>
            </form>
            <div className="text-center">
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
        </div>
    );
}
