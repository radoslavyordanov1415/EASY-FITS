import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
// Register route
router.post('/register', async (req, res) => {

});


// Login route
router.post('/login', async (req, res) => {


});

// Logout route
router.post('/logout', (req, res) => {


});

// Status check route 
router.get('/status', (req, res) => {

});

export default router;