const express = require('express');
const router = express.Router();

const testimonials = [
    { id: 1, name: 'John Smith', role: 'CEO', company: 'TechStart Inc.', content: 'CrackOne delivered our MVP in record time. Their expertise in React and Node.js is exceptional!', rating: 5 },
    { id: 2, name: 'Sarah Johnson', role: 'CTO', company: 'CloudFlow', content: 'The cloud migration was seamless. Zero downtime and 40% cost reduction. Highly recommended!', rating: 5 },
    { id: 3, name: 'Michael Chen', role: 'Founder', company: 'DataSmart', content: 'Outstanding API development. Clean code, great documentation, and excellent communication.', rating: 5 },
    { id: 4, name: 'Emily Davis', role: 'Product Manager', company: 'InnovateTech', content: 'The SaaS platform they built exceeded our expectations. Professional team and great results!', rating: 5 }
];

router.get('/', (req, res) => {
    res.json({ success: true, data: testimonials });
});

router.get('/:id', (req, res) => {
    const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
    if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, data: testimonial });
});

module.exports = router;
