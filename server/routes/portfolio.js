const express = require('express');
const router = express.Router();

// Portfolio data
const portfolio = [
    { id: 1, category: 'saas', title: 'SaaS Analytics Platform', client: 'TechMetrics Inc.', description: 'Comprehensive SaaS analytics platform with real-time data visualization', outcome: '+200% User Engagement', tech: ['React.js', 'Node.js', 'MySQL', 'AWS'] },
    { id: 2, category: 'cloud', title: 'Cloud Migration Project', client: 'Enterprise Corp.', description: 'Migrated legacy infrastructure to AWS with zero downtime', outcome: '-40% Infrastructure Cost', tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
    { id: 3, category: 'web', title: 'E-Commerce Portal', client: 'ShopMax Global', description: 'High-performance e-commerce platform', outcome: '+150% Sales Increase', tech: ['React.js', 'Express.js', 'MySQL', 'Stripe'] },
    { id: 4, category: 'mobile', title: 'Healthcare Mobile App', client: 'MedConnect', description: 'Telehealth platform for remote consultations', outcome: '+2.1x Patient Engagement', tech: ['React Native', 'Node.js', 'PostgreSQL'] },
    { id: 5, category: 'web', title: 'Admin Dashboard System', client: 'DataFlow Inc.', description: 'Comprehensive admin dashboard with real-time analytics', outcome: '+85% Operational Efficiency', tech: ['React.js', 'Chart.js', 'Express.js'] },
    { id: 6, category: 'saas', title: 'Project Management Tool', client: 'TeamWork Pro', description: 'Multi-tenant project management SaaS', outcome: '+120% Team Productivity', tech: ['React.js', 'Node.js', 'Socket.io'] }
];

router.get('/', (req, res) => {
    res.json({ success: true, data: portfolio });
});

router.get('/:id', (req, res) => {
    const project = portfolio.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
});

router.get('/category/:category', (req, res) => {
    const filtered = portfolio.filter(p => p.category === req.params.category);
    res.json({ success: true, data: filtered });
});

module.exports = router;
