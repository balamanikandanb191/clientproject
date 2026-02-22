import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaChartLine, FaExternalLinkAlt } from 'react-icons/fa'
import './Portfolio.css'

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const filters = [
        { id: 'all', label: 'All Projects' }
    ]

    const projects = [
       {
    id: 7,
    category: 'Software Development',
    title: 'Smart Product Comparison System',
    description: 'Developed a Python-based web application that compares products across price, features, and ratings, providing users with intelligent recommendations and visual insights for better purchasing decisions.',
    outcome: 'Improved Product Selection Accuracy & User Decision Support',
    tech: ['Python', 'Flask', 'Pandas', 'SQLite', 'REST API'],
    color: 'green',
    image: '/images/dash.png'
}
,
        {
            id: 2,
            category: 'Cloud Computing',
            title: 'Serverless Architecture Food Delivery Platform',
            client: 'Enterprise Corp.',
            description: 'Designed and deployed a scalable serverless food delivery platform on AWS, enabling real-time order processing, secure APIs, and automatic scaling for high user traffic.',
            outcome: 'High Scalability & Reduced Operational Cost',
            tech: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB'],
            color: 'cyan',
            image: '/images/cloud.png'
        },
       {
    id: 3,
    category: 'IOT Development',
    title: 'Smart Helmet Safety System',
    client: 'Innovation Project',
    description: 'Developed an IoT-enabled smart helmet with accident detection, alcohol sensing, GPS tracking, and mobile alerts to improve rider safety and prevent impaired driving.',
    outcome: 'Enhanced Road Safety & Real-Time Rider Monitoring',
    tech: ['Arduino', 'IoT Sensors', 'GPS Module', 'GSM', 'Embedded C'],
    color: 'purple',
    image: '/images/smart.png'
}
,
       {
    id: 5,
    category: 'Full Stack Development',
    title: 'Cricket Score Analyzer Platform',
    description: 'Developed a full-stack cricket analytics platform that tracks live scores, analyzes player performance, visualizes match statistics, and provides insights through interactive dashboards.',
    outcome: 'Enhanced Match Insights & Data Visualization Experience',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js'],
    color: 'orange',
    image: '/images/cric.png'
}
,
        {
    id: 5,
    category: 'Game Development',
    title: '3D Car Environment Game',
    description: 'Developed an interactive 3D space survival game with player missions, enemy AI, scoring system, and smooth controls, delivering an immersive gameplay experience across desktop platforms.',
    outcome: 'High User Engagement & Smooth Gameplay Performance',
    tech: ['Unity', 'C#', 'Blender', 'Game Physics'],
    color: 'orange',
    image: '/images/game.png'
}
,
       {
    id: 6,
    category: 'UI/UX Design',
    title: 'Café Website UX System',
    description: 'Designed a modern coffee shop website interface focusing on user-friendly navigation, aesthetic layouts, and responsive design to enhance customer engagement and online ordering experience.',
    outcome: 'Improved User Engagement & Brand Experience',
    tech: ['Figma', 'UI Design', 'UX Research', 'Responsive Design'],
    color: 'pink',
    image: '/images/image.png'
}
    ]

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter)

    return (
        <div className="portfolio-page">
            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="container">
                    <div className="portfolio-hero-content">
                        <span className="section-badge">Our Portfolio</span>
                        <h1>Projects That <span className="gradient-text">Deliver Results</span></h1>
                        <p>
                            Explore our successful projects across web development, SaaS platforms,
                            cloud solutions, and mobile applications.
                        </p>
                    </div>
                </div>
                <div className="portfolio-hero-bg"></div>
            </section>

            {/* Filter Section */}
            <section className="portfolio-filter">
                <div className="container">
                    <div className="filter-tabs">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="projects-section section">
                <div className="container">
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`project-card project-${project.color}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="project-image">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="project-img" />
                                    ) : null}
                                    <div className="project-overlay">
                                        <button className="view-project-btn">
                                            <FaExternalLinkAlt />
                                        </button>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <span className="project-category">{project.category}</span>
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-outcome">
                                        <FaChartLine />
                                        <span>{project.outcome}</span>
                                    </div>

                                    <div className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

               

            {/* CTA Section */}
            <section className="portfolio-cta-section">
                <div className="container">
                    <div className="portfolio-cta-content">
                        <h2>Want Your Project Here?</h2>
                        <p>Let's build something amazing together.</p>
                        <Link to="/contact" className="btn btn-primary">
                            Start Your Project <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Portfolio
