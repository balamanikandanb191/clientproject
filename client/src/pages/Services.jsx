import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaCode, FaServer, FaDatabase, FaCloud, FaCogs, FaShieldAlt,
    FaMobile, FaRocket, FaSyncAlt, FaArrowRight, FaCheck,
    FaDocker, FaAws, FaLock, FaChartLine
} from 'react-icons/fa'
import './Services.css'

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('all')

    const categories = [
        { id: 'all', label: 'All Services' }
    ]

    const services = [

    {
        id: 1,
        category: 'software',
        icon: <FaCode />,
        title: 'Software Development',
        description: 'Scalable software solutions tailored to business workflows',
        features: [
            'Enterprise applications',
            'Startup MVP development',
            'Business automation tools',
            'Secure architecture design'
        ],
        tech: ['Java', 'Spring Boot', 'MySQL', 'REST APIs']
    },
    {
        id: 2,
        category: 'software',
        icon: <FaServer />,
        title: 'Full Stack Web Development',
        description: 'Complete frontend and backend solutions for modern platforms',
        features: [
            'Frontend & backend integration',
            'Authentication systems',
            'API & database design',
            'Deployment-ready apps'
        ],
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB']
    },
    {
        id: 3,
        category: 'cloud',
        icon: <FaCloud />,
        title: 'Cloud Application Development',
        description: 'Cloud-native applications built for performance and scalability',
        features: [
            'Serverless deployment',
            'Auto scaling infrastructure',
            'Cloud storage integration',
            'High availability systems'
        ],
        tech: ['AWS', 'Azure', 'Google Cloud', 'Lambda']
    },
    {
        id: 4,
        category: 'cloud',
        icon: <FaDocker />,
        title: 'DevOps & Cloud Automation',
        description: 'Automated deployment pipelines and infrastructure management',
        features: [
            'CI/CD pipelines',
            'Docker containerization',
            'Kubernetes deployment',
            'Infrastructure as Code'
        ],
        tech: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
    },
    {
        id: 5,
        category: 'software',
        icon: <FaCogs />,
        title: 'IoT Solution Development',
        description: 'Smart device systems with sensors, automation, and monitoring',
        features: [
            'Sensor integration',
            'Embedded system programming',
            'Real-time monitoring dashboards',
            'Cloud-connected IoT devices'
        ],
        tech: ['Arduino', 'IoT Sensors', 'MQTT', 'Embedded C']
    },
    {
        id: 6,
        category: 'software',
        icon: <FaRocket />,
        title: 'Game Development',
        description: 'Interactive 2D and 3D games with immersive gameplay',
        features: [
            '2D & 3D game design',
            'Game physics & controls',
            'AI gameplay logic',
            'Cross-platform builds'
        ],
        tech: ['Unity', 'C#', 'Blender', 'Game Physics']
    },
    {
    id: 7,
    category: 'products',
    icon: <FaMobile />,
    title: 'UI/UX Design',
    description: 'Modern user interfaces and seamless digital experiences for web and mobile platforms',
    features: [
        'User-centered design approach',
        'Responsive web & mobile UI',
        'Wireframing & prototyping',
        'Design systems & usability optimization'
    ],
    tech: ['Figma', 'UI Design', 'UX Research', 'Prototyping']
},
{
    id: 8,
    category: 'products',
    icon: <FaRocket />,
    title: 'Video Editing',
    description: 'Professional video editing services for promotional, social media, and business content',
    features: [
        'Professional trimming & transitions',
        'Motion graphics & subtitles',
        'Color grading & audio sync',
        'YouTube & social media optimization'
    ],
    tech: ['Premiere Pro', 'After Effects', 'DaVinci Resolve']
},
{
    id: 9,
    category: 'products',
    icon: <FaChartLine />,
    title: 'Digital Marketing',
    description: 'Strategic online marketing solutions to increase brand visibility and audience engagement',
    features: [
        'Social media marketing',
        'SEO optimization',
        'Paid ad campaign management',
        'Brand growth strategy'
    ],
    tech: ['SEO Tools', 'Google Ads', 'Meta Ads', 'Analytics']
}

]


    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(s => s.category === activeCategory)

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="container">
                    <div className="services-hero-content">
                        <span className="section-badge">Our Services</span>
                        <h1>Comprehensive <span className="gradient-text">Development Solutions</span></h1>
                        <p>
                            From custom software development to cloud infrastructure, we provide end-to-end
                            solutions that transform your business and drive growth.
                        </p>
                    </div>
                </div>
                <div className="services-hero-bg"></div>
            </section>

            {/* Filter Section */}
            <section className="services-filter">
                <div className="container">
                    <div className="filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-list section">
                <div className="container">
                    <div className="services-grid-full">
                        {filteredServices.map((service, index) => (
                            <div
                                key={service.id}
                                className="service-card-full glass-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="service-header">
                                    <div className="service-icon-lg">
                                        {service.icon}
                                    </div>
                                    <div className="service-title-area">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                </div>

                                <div className="service-features">
                                    <h4>Key Features</h4>
                                    <ul>
                                        {service.features.map((feature, i) => (
                                            <li key={i}>
                                                <FaCheck className="check-icon" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="service-tech">
                                    <h4>Technologies</h4>
                                    <div className="tech-tags">
                                        {service.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <Link to="/contact" className="service-cta">
                                    Get Started <FaArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Our Process</span>
                        <h2>How We <span className="gradient-text">Work</span></h2>
                        <p>A structured approach to deliver exceptional results</p>
                    </div>

                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <h3>Discovery</h3>
                            <p>Understanding your requirements, goals, and business needs</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-number">02</div>
                            <h3>Planning</h3>
                            <p>Creating detailed roadmap, architecture, and timelines</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-number">03</div>
                            <h3>Development</h3>
                            <p>Agile development with regular updates and demos</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-number">04</div>
                            <h3>Delivery</h3>
                            <p>Testing, deployment, and ongoing support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta-section">
                <div className="container">
                    <div className="services-cta-content">
                        <h2>Ready to Build Your Next Project?</h2>
                        <p>Let's discuss how we can help transform your ideas into reality.</p>
                        <Link to="/contact" className="btn btn-primary">
                            Start Your Project <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services
