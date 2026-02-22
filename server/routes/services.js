const express = require('express');
const router = express.Router();

// Services data (in production, fetch from database)
const services = [
    { id: 1, category: 'software', title: 'Custom Software Development', description: 'End-to-end software solutions', icon: 'code', features: ['End-to-end software solutions', 'Business process automation', 'Scalable enterprise applications', 'Startup MVP development'], tech: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MySQL'] },
    { id: 2, category: 'software', title: 'Web Application Development', description: 'Modern web applications', icon: 'server', features: ['Single Page Applications (SPA)', 'Progressive Web Apps (PWA)', 'Admin dashboards & portals', 'High-performance web platforms'], tech: ['React.js', 'Next.js', 'TypeScript', 'REST APIs'] },
    { id: 3, category: 'software', title: 'API & Backend Development', description: 'Robust backend systems', icon: 'database', features: ['RESTful API development', 'Secure authentication', 'Microservices architecture', 'Third-party API integrations'], tech: ['Node.js', 'Express.js', 'GraphQL', 'JWT'] },
    { id: 4, category: 'software', title: 'SaaS Application Development', description: 'Subscription-based platforms', icon: 'cogs', features: ['Subscription-based platforms', 'Multi-tenant SaaS systems', 'Payment gateway integration', 'User & role management'], tech: ['React.js', 'Node.js', 'Stripe', 'MySQL'] },
    { id: 5, category: 'software', title: 'Software Modernization', description: 'Legacy system upgrades', icon: 'sync', features: ['Legacy system upgrades', 'Monolith to microservices', 'Performance optimization', 'Code refactoring'], tech: ['Microservices', 'Docker', 'CI/CD'] },
    { id: 6, category: 'cloud', title: 'Cloud Application Development', description: 'Cloud-native applications', icon: 'cloud', features: ['Cloud-native design', 'Serverless applications', 'High availability systems', 'Multi-cloud architecture'], tech: ['AWS', 'Azure', 'Google Cloud', 'Lambda'] },
    { id: 7, category: 'cloud', title: 'Cloud Migration Services', description: 'Seamless cloud migration', icon: 'rocket', features: ['On-premise to cloud migration', 'Database migration', 'Application re-architecture', 'Zero-downtime migration'], tech: ['AWS RDS', 'Azure SQL', 'VPC'] },
    { id: 8, category: 'cloud', title: 'Cloud Infrastructure & DevOps', description: 'Infrastructure automation', icon: 'docker', features: ['Cloud infrastructure setup', 'CI/CD pipelines', 'Docker & Kubernetes', 'Infrastructure as Code'], tech: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins'] },
    { id: 9, category: 'cloud', title: 'Cloud Security & Monitoring', description: 'Enterprise-grade security', icon: 'shield', features: ['Secure cloud architecture', 'Role-based access control', 'Monitoring & logging', 'Disaster recovery'], tech: ['IAM', 'CloudWatch', 'Prometheus'] }
];

// GET all services
router.get('/', (req, res) => {
    res.json({ success: true, data: services });
});

// GET service by ID
router.get('/:id', (req, res) => {
    const service = services.find(s => s.id === parseInt(req.params.id));
    if (!service) {
        return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, data: service });
});

// GET services by category
router.get('/category/:category', (req, res) => {
    const filtered = services.filter(s => s.category === req.params.category);
    res.json({ success: true, data: filtered });
});

module.exports = router;
