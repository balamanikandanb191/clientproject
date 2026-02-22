import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaRocket, FaCode, FaCloud, FaServer, FaMobile, FaDatabase, FaShieldAlt, FaCogs, FaChartLine, FaArrowRight, FaStar, FaQuoteLeft, FaQuestion } from 'react-icons/fa'
import './Home.css'

const Home = () => {
    const [countersVisible, setCountersVisible] = useState(false)
    const statsRef = useRef(null)

    // Counter animation observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCountersVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const services = [
        { icon: <FaCode />, title: 'Software Development', desc: 'End-to-end software solutions including custom applications, MVP development, and scalable enterprise systems tailored to business needs.' },
        { icon: <FaServer />, title: 'Cloud Solutions', desc: 'Cloud-native applications, serverless architecture, and integration with major cloud platforms like AWS, Azure, and Google Cloud.' },
        { icon: <FaDatabase />, title: 'Game & IOT Development', desc: 'We build immersive games and smart IoT solutions, combining interactive experiences with connected devices, real-time data, and scalable cloud integration.' },
        { icon: <FaCloud />, title: 'Full Stack Development', desc: 'Development of complete web applications including frontend, backend, APIs, databases, and secure authentication systems.' },
        { icon: <FaCogs />, title: 'UI/UX Design', desc: 'Modern user interfaces and seamless user experiences including responsive layouts, dashboards, and interactive design systems.' },
        { icon: <FaShieldAlt />, title: 'Video Editing & Digital Marketing', desc: 'We create engaging videos with professional editing and storytelling while driving brand growth through digital marketing, social media strategy, SEO, and campaigns.' }
    ]

    const stats = [
        { value: 10, suffix: '+', label: 'Projects Completed' },
        { value: 5, suffix: '+', label: 'Happy Clients' },
        { value: 99, suffix: '%', label: 'Client Satisfaction' }
    ]

    const testimonials = [
        {
            name: 'John Smith',
            role: 'CEO, TechStart Inc.',
            content: 'CrackOne delivered our MVP in record time. Their expertise in React and Node.js is exceptional!',
            rating: 5
        },
        {
            name: 'Sarah Johnson',
            role: 'CTO, CloudFlow',
            content: 'The cloud migration was seamless. Zero downtime and 40% cost reduction. Highly recommended!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Founder, DataSmart',
            content: 'Outstanding API development. Clean code, great documentation, and excellent communication.',
            rating: 5
        }
    ]

    const caseStudies = [
        {
            title: 'Serverless Food Delivery Platform',
            outcome: 'High Scalability & Reduced Operational Cost',
            category: 'Cloud Computing',
            image: '/images/cloud.png'
        },
        {
            title: 'Smart Helmet Safety System',
            outcome: 'Enhanced Road Safety & Real-Time Rider Monitoring',
            category: 'IoT Development',
            image: '/images/smart.png'
        },
        {
            title: 'Café Website UX System',
            outcome: 'Improved User Engagement & Brand Experience',
            category: 'UI/UX Design',
            image: '/images/image.png'
        }
    ]

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}></div>
                    ))}
                </div>

                <div className="hero-content container">
                    <div className="hero-badge animate-fadeInDown">
                        <FaRocket className="badge-icon" />
                        <span>Transforming Ideas into Digital Reality</span>
                    </div>

                    <h1 className="hero-title animate-fadeInUp">
                        Empowering Businesses with
                        <span className="highlight"> Software Development</span> &
                        <span className="highlight"> Cloud Solutions</span>
                    </h1>

                    <p className="hero-subtitle animate-fadeInUp delay-200">
                        We build intelligent, scalable, and high-performance applications using
                        React.js, Node.js, Express.js, and MySQL. From startups to enterprises,
                        we deliver digital excellence.
                    </p>

                    <div className="hero-cta animate-fadeInUp delay-400">
                        <Link to="/contact" className="btn btn-primary">
                            Get Started <FaArrowRight />
                        </Link>
                        <Link to="/services" className="btn btn-secondary">
                            Explore Services
                        </Link>
                    </div>
                </div>

                <div className="hero-scroll">
                    <div className="scroll-indicator">
                        <div className="scroll-dot"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}

            <section className="stats-section" ref={statsRef}>
                <center>
                    <div className="container">
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-value">
                                        <Counter end={stat.value} visible={countersVisible} />
                                        <span className="stat-suffix">{stat.suffix}</span>
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </center>
            </section>


            {/* Services Section */}
            <section className="services-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Our Services</span>
                        <h2>Comprehensive <span className="gradient-text">Development Solutions</span></h2>
                        <p>From concept to deployment, we deliver end-to-end software and cloud solutions tailored to your business needs.</p>
                    </div>

                    <div className="services-marquee">
                        <div className="services-track">
                            {[...services, ...services].map((service, index) => (
                                <div key={index} className="service-card glass-card">
                                    <div className="service-icon">
                                        {service.icon}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                    <Link to="/services" className="service-link">
                                        Learn more <FaArrowRight />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="services-cta">
                        <Link to="/services" className="btn btn-primary">
                            View All Services <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="case-studies-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Case Studies</span>
                        <h2>Real <span className="gradient-text">Results</span> We've Delivered</h2>
                        <p>See how we've helped businesses transform their digital presence and achieve remarkable outcomes.</p>
                    </div>

                    <div className="cases-grid">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="case-card">
                                <div
                                    className="case-image"
                                    style={{ backgroundImage: `url(${study.image})` }}
                                ></div>
                                <div className="case-content">
                                    <span className="case-category">{study.category}</span>
                                    <h3>{study.title}</h3>
                                    <div className="case-outcome">
                                        <FaChartLine />
                                        <span>{study.outcome}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cases-cta">
                        <Link to="/portfolio" className="btn btn-secondary">
                            View All Case Studies <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-us-section section">
                <div className="container">
                    <div className="why-us-content">
                        <div className="why-us-text">
                            <span className="section-badge">Why CrackOne</span>
                            <h2>We Build Software That <span className="gradient-text">Scales</span></h2>
                            <div className="why-features">
                                <div className="why-feature">
                                    <div className="feature-icon"><FaRocket /></div>
                                    <div className="feature-content">
                                        <h4>Fast Delivery</h4>
                                        <p>Agile development with rapid iterations and weekly demos</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="feature-icon"><FaShieldAlt /></div>
                                    <div className="feature-content">
                                        <h4>Enterprise Security</h4>
                                        <p>Industry-standard security practices and compliance</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="feature-icon"><FaCloud /></div>
                                    <div className="feature-content">
                                        <h4>Cloud-Native</h4>
                                        <p>Built for scale with modern cloud architectures</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="feature-icon"><FaCogs /></div>
                                    <div className="feature-content">
                                        <h4>Full Support</h4>
                                        <p>Continuous maintenance and 24/7 technical support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="why-us-visual">
                            <FaQuestion className="visual-icon large" />
                        </div>
                    </div>
                </div>

            </section>

            {/* Testimonials Section */}


            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-bg"></div>
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Business?</h2>
                        <p>Let's discuss how we can help you build amazing software solutions.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn btn-primary">
                                Start Your Project <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Schedule a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Counter Component
const Counter = ({ end, visible }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!visible) return

        let start = 0
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [visible, end])

    return <span>{count}</span>
}

export default Home
