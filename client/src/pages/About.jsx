import { FaBolt, FaUsers, FaLightbulb, FaHandshake, FaTrophy, FaRocket, FaHeart, FaShieldAlt, FaLinkedin } from 'react-icons/fa'
import './About.css'

const About = () => {
    const values = [
        { icon: <FaLightbulb />, title: 'Innovation', desc: 'We embrace cutting-edge technologies to deliver future-ready solutions' },
        { icon: <FaHandshake />, title: 'Integrity', desc: 'Transparent communication and honest partnerships with our clients' },
        { icon: <FaTrophy />, title: 'Excellence', desc: 'Committed to delivering the highest quality in everything we do' },
        { icon: <FaHeart />, title: 'Passion', desc: 'We love what we do and it shows in every project we deliver' }
    ]

    const team = [
        { name: 'VINOTH ', role: 'Marketing & Video Editor', initial: 'V',image: '/images/vino.png', linkedin: 'https://www.linkedin.com/in/vinoth-b-88a9742b7/' },
        { name: 'BALAMANIKANDAN ', role: 'Cloud Architect', initial: 'B',image: '/images/bala.png', linkedin: 'https://www.linkedin.com/in/balamanikandan-s-4978a72b1/' },
        { name: 'SANTHOSH KUMAR ', role: 'FullStack Developer', initial: 'S',image: '/images/santhosh.jpeg', linkedin: 'https://www.linkedin.com/in/santhosh-kumar-6a498a2a0/' },
        { name: 'HARIHARASUDHAN ', role: 'Game & IOT Developer', initial: 'H',image: '/images/hariharasudhan.jpeg', linkedin: 'https://www.linkedin.com/in/hariharasudhan-k-437aa2294/' },
        { name: 'RANJITTH KUMAR ', role: 'Software Developer', initial: 'R',image: '/images/ranjith.jpeg', linkedin: 'https://www.linkedin.com/in/ranjithkumar-s-285468355/' },
        { name: 'KISHORE  ', role: 'Designer', initial: 'S' , image: '/images/kishore.jpeg', linkedin: 'https://www.linkedin.com/in/kishore-s-b07a802a0/' },
        { name: 'SARRATH BABU ', role: 'MERN Stack Developer', initial: 'S', image: '/images/sarrath.jpeg', linkedin: 'https://www.linkedin.com/in/sarrathbabu/' }
    ]

    const milestones = [
        { year: '2020', event: 'CrackOne Founded', desc: 'Started with a vision to transform businesses digitally' },
        { year: '2021', event: 'First Major Client', desc: 'Delivered enterprise-grade SaaS platform' },
        { year: '2022', event: 'Cloud Services Launch', desc: 'Expanded into AWS, Azure, and GCP solutions' },
        { year: '2023', event: '100+ Projects', desc: 'Milestone of delivering over 100 successful projects' },
        { year: '2024', event: 'Global Expansion', desc: 'Serving clients across 15+ countries' }
    ]

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <span className="section-badge">About Us</span>
                        <h1>We Build <span className="gradient-text">Digital Excellence</span></h1>
                        <p>
                            CrackOne is a leading software development and cloud solutions company
                            dedicated to helping businesses transform their ideas into powerful digital products.
                        </p>
                    </div>
                </div>
                <div className="about-hero-bg"></div>
            </section>

            {/* Mission Section */}
            <section className="mission-section section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card glass-card">
                            <div className="mission-icon">
                                <FaRocket />
                            </div>
                            <h3>Our Mission</h3>
                            <p>
                                To design and deliver scalable Cloud, Software, and Web solutions that solve real-world problems.

                                To create engaging UI/UX and Game experiences that inspire users.

                                To help brands grow with result-driven Digital Marketing strategies.

                                To innovate with IoT technologies that connect the physical and digital world.

                                To continuously learn, adapt, and lead in emerging technologies.
                            </p>
                        </div>
                        <div className="mission-card glass-card">
                            <div className="mission-icon">
                                <FaBolt />
                            </div>
                            <h3>Our Vision</h3>
                            <p>
                                To become a globally trusted technology company that empowers businesses and individuals through innovative cloud solutions, smart software, immersive digital experiences, and future-ready technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* 
            <section className="values-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Our Values</span>
                        <h2>What <span className="gradient-text">Drives</span> Us</h2>
                        <p>The core principles that guide everything we do</p>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="timeline-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Our Journey</span>
                        <h2>Milestones & <span className="gradient-text">Achievements</span></h2>
                    </div>

                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-content glass-card">
                                    <span className="timeline-year">{milestone.year}</span>
                                    <h3>{milestone.event}</h3>
                                    <p>{milestone.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="timeline-line"></div>
                    </div>
                </div>
            </section>
            */}

            {/* Team Section */}
            <section className="team-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Our Team</span>
                        <h2>Meet the <span className="gradient-text">Experts</span></h2>
                        <p>Passionate professionals dedicated to your success</p>
                    </div>

                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card glass-card">
                                <div className="team-avatar">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="member-photo" />
                                    ) : (
                                        <span>{member.initial}</span>
                                    )}
                                </div>
                                <h3>{member.name}</h3>
                                <span className="team-role">{member.role}</span>
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">
                                        <FaLinkedin />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Tech Stack Section */}
            <section className="tech-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Technology</span>
                        <h2>Our <span className="gradient-text">Tech Stack</span></h2>
                    </div>

                    <div className="tech-grid">
                        
                        <div className="tech-category">
                            <h4>FullStack Development</h4>
                            <div className="tech-badges">
                                
                                <span className="tech-badge">React.js</span>
                                <span className="tech-badge">Next.js</span>
                                <span className="tech-badge">Node.js</span>
                                <span className="tech-badge">Express.js</span>
                                <span className="tech-badge">REST APIs</span>
                                <span className="tech-badge">Angular.js</span>
                                <span className="tech-badge">MongoDB</span>
                                <span className="tech-badge">MySQL</span>
                            </div>
                        </div>
                       
                        <div className="tech-category">
                            <h4>Cloud & DevOps</h4>
                            <div className="tech-badges">
                                <span className="tech-badge">AWS</span>
                                <span className="tech-badge">Azure</span>
                                <span className="tech-badge">Docker</span>
                                <span className="tech-badge">Kubernetes</span>
                                
                                <span className="tech-badge">Jenkins</span>
                                <span className="tech-badge">Terraform</span>
                                
                                <span className="tech-badge">Git</span>
                                <span className="tech-badge">GitHub</span>
                                
                                <span className="tech-badge">GCP</span>
                                <span className="tech-badge">Promotheus</span>
                                
                                <span className="tech-badge">Grafana</span>
                            </div>
                        </div>
                         <div className="tech-category">
                            <center>
                            <h4>Game & IOT Development</h4></center>
                            <div className="tech-badges">
                                <span className="tech-badge">Unity</span>
                                <span className="tech-badge">Unreal Engine</span>
                                <span className="tech-badge">Blender</span>
                                <span className="tech-badge">Arduino</span>
                                <span className="tech-badge">Raspberry Pi</span>
                                <span className="tech-badge">ESP32</span>
                                <span className="tech-badge">Embedded C</span>
                            </div>
                        </div>
                        <div className="tech-category"> 
                            <center>
                            <h4>Software Development & UI/UX</h4></center>
                            <div className="tech-badges">
                                <span className="tech-badge">Java</span>
                                <span className="tech-badge">Python</span>
                                <span className="tech-badge">C++</span>
                                <span className="tech-badge">C</span>
                                <span className="tech-badge">Spring Boot</span>
                                <span className="tech-badge">Django</span>
                                <span className="tech-badge">Flask</span>
                                <span className="tech-badge">Figma</span>
                                <span className="tech-badge">Adobe XD</span>
                                <span className="tech-badge">Photoshop</span>
                                <span className="tech-badge">Illustrator</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="why-about-section section">
                <div className="container">
                    <div className="why-about-content">
                        <div className="why-about-text">
                            <span className="section-badge">Why CrackOne</span>
                            <h2>Your Trusted <span className="gradient-text">Technology Partner</span></h2>
                            <ul className="why-list">
                                <li>
                                    <FaShieldAlt className="list-icon" />
                                    <span>Enterprise-grade security and compliance</span>
                                </li>
                                <li>
                                    <FaUsers className="list-icon" />
                                    <span>Dedicated team of expert developers</span>
                                </li>
                                <li>
                                    <FaRocket className="list-icon" />
                                    <span>Agile development with rapid delivery</span>
                                </li>
                                <li>
                                    <FaHandshake className="list-icon" />
                                    <span>Long-term partnership approach</span>
                                </li>
                            </ul>
                        </div>
                        <div className="why-about-stats">
                            <div className="about-stat">
                                <span className="stat-number">10+</span>
                                <span className="stat-text">Projects Delivered</span>
                            </div>
   
                            <div className="about-stat">
                                <span className="stat-number">99%</span>
                                <span className="stat-text">Client Retention</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
