const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Demo users (in production, use database)
const users = [
    { id: 1, name: 'Admin', email: 'admin@crackone.com', password: '$2a$10$XQxBBo8LxOqvOMvzFHVGcuUxKKmJq8G.3MH5KrVWw1xkqGVF8RHXS', role: 'admin' } // password: admin123
];

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password required' });
        }

        const user = users.find(u => u.email === email);

        // For demo, accept any credentials
        const token = jwt.sign(
            { id: user?.id || 1, email: email, role: 'admin' },
            process.env.JWT_SECRET || 'demo_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: { token, user: { id: 1, name: 'Admin', email, role: 'admin' } }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Login failed' });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'All fields required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: 'user' };
        users.push(newUser);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
});

// Verify token
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo_secret_key');
        res.json({ success: true, data: decoded });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
});

module.exports = router;
