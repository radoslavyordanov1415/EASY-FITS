import React from "react";

import logoImg from "../../assets/logo.png"
import "./NavBar.css"
export default function NavBar() {
    return (
        <header className="header">
            <a href="/" className="logo" >
                <img src={logoImg} />
            </a>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                <a href="/logout">Logout</a>
                <a href="/create">Create</a>
                <a href="/profile">Profile</a>
            </nav>
        </header>
    );
}
