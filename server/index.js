const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const servicesRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');
const testimonialsRoutes = require('./routes/testimonials');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'CrackOne API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to CrackOne API',
        version: '1.0.0',
        endpoints: {
            services: '/api/services',
            portfolio: '/api/portfolio',
            contact: '/api/contact',
            testimonials: '/api/testimonials',
            auth: '/api/auth'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 CrackOne Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
