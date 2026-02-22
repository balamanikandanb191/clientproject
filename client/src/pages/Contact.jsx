import { useState } from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaPaperPlane,
  FaCheck
} from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

 const services = [
  'Software Development',
  'Web Application Development',
  'API & Backend Development',
  'Cloud Solutions & DevOps',
  'SaaS Platform Development',
  'UI / UX Design',
  'Game Development',
  'Digital Marketing',
  'IoT Development',
  'Other'
]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ✅ FINAL BACKEND-CONNECTED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
     const response = await fetch('https://clientproject-mjew.onrender.com/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
    } catch (err) {
      setError('Server error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="section-badge">Contact Us</span>
            <h1>
              Let's Build <span className="gradient-text">Something Amazing</span>
            </h1>
            <p>
              Have a project in mind? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        <div className="contact-hero-bg"></div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper glass-card">
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <FaCheck />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2>Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="input-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-group">
                        <label>Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Service Interested In</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        {services.map((s, i) => (
                          <option key={i} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Your Message *</label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        <>Send Message <FaPaperPlane /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-card glass-card">
                <FaEnvelope />
                <p>crackonetechnologies@gmail.com</p>
              </div>

              <div className="info-card glass-card">
                <FaPhone />
                <p>+91 98428 36526</p>
              </div>

              <div className="info-card glass-card">
                <FaMapMarkerAlt />
                <p>Erode, Tamil Nadu, India</p>
              </div>

              <div className="social-connect">
                <h4>Connect With Us</h4>
                <div className="social-links">
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaGithub /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
