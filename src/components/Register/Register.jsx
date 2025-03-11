import React, { useState } from "react";
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return alert('Passwords do not match')
        };

        if (!username || !email || !password) {
            return alert('All fields are required!')
        };

        try {
            const response = await fetch('http://localhost:5001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful!');

            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Something went wrong!')
            console.error(err);
        };
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
                <div className="input-field">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="username">Full Name</label>
                </div>
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
                <div className="input-field">
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <button type="submit" className="btn-submit">Sign Up</button>
            </form>
            <div className="text-center">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}
