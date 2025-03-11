import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import logoImg from "../../assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <a href="/" className="logo">
                <img src={logoImg} alt="Logo" />
            </a>
            <nav className="navbar">
                <Link to="/">Home</Link>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/create">Create</Link>
                        <Link to="/profile">Profile</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* The logout button */}
                    </>
                )}
            </nav>
        </header>
    );
}
