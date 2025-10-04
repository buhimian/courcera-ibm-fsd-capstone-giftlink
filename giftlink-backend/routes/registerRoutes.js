/*jshint esversion: 8 */
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// POST /api/register
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const db = await connectToDatabase();
        const users = db.collection('users');
        // Check if user already exists
        const existing = await users.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'User already exists.' });
        }
        // Hash password with strong salt
        const saltRounds = 14; // very strong
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };
        await users.insertOne(user);
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
