import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //* If user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' })
        };

        //* Creating new user
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        //* Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(201).json({ message: 'User registered successfully.' })
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        //* Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(200).json({ message: 'User logged in successfully.' });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out successfully.' });
});

// Status check route 
router.get('/status', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ isLoggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        return res.json({ isLoggedIn: true, userId: decoded.userId, username: decoded.username });
    } catch (err) {
        return res.json({ isLoggedIn: false });
    }
});

export default router;