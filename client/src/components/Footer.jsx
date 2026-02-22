import { Link } from 'react-router-dom'
import { FaBolt, FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' }
    ]

    const services = [
        'Software Development',
        'Web Application Development',
        'API & Backend Development',
        'Cloud Solutions & DevOps',
        'SaaS Platform Development',
        'UI / UX Design',
        'Game Development',
        'Digital Marketing',
        'IoT Development'
    ]

    const socialLinks = [
        { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/crackone-technologies', label: 'LinkedIn' },
        { icon: <FaTwitter />, url: '#', label: 'Twitter' },
        { icon: <FaGithub />, url: 'https://github.com/crackone-technologies', label: 'GitHub' },
        { icon: <FaInstagram />, url: '#', label: 'Instagram' }
    ]

    return (
        <footer className="footer">
            <div className="footer-glow"></div>

            <div className="footer-content">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <div className="logo-wrapper">
                                    <img src="/logo.png" alt="CrackOne Logo" className="logo-image" />
                                </div>
                                <span className="logo-text">CrackOne Technologies</span>
                            </Link>
                            <p className="footer-description">
                                Empowering businesses with cutting-edge software development,
                                cloud solutions, and digital transformation services.
                            </p>
                            <div className="footer-social">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-link"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="footer-section">
                            <h4>Services</h4>
                            <ul className="footer-links">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link to="/services">{service}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section">
                            <h4>Contact Us</h4>
                            <div className="footer-contact">
                                <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <a href="mailto:crackonetechnologies@gmail.com">crackonetechnologies@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <a href="tel:+919842836526">+91 98428 36526</a>
                                </div>
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>Erode, Tamilnadu, TN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} CrackOne Technologies. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
