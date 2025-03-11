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


});

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out successfully.' });
});

// Status check route 
router.get('/status', (req, res) => {

});

export default router;