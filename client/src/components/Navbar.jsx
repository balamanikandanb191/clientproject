import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaBolt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' }
    ]

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="logo-wrapper">
                        <img src="/images/logo.png" alt="CrackOne Logo" className="logo-image" />
                    </div>
                    <span className="logo-text">CrackOne Technologies</span>
                </Link>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                            <span className="link-underline"></span>
                        </Link>
                    ))}
                    <Link to="/contact" className="btn btn-primary navbar-cta" onClick={() => setIsOpen(false)}>
                        Get Started
                    </Link>
                </div>

                <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
