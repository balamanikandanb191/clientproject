-- ============================================
-- CrackOne Database Schema
-- MySQL Database for Company Website
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS crackone_db;
USE crackone_db;

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    category ENUM('software', 'cloud', 'products') NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    features JSON,
    tech JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio/Case Studies table
CREATE TABLE IF NOT EXISTS portfolio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    client VARCHAR(100),
    category VARCHAR(50),
    description TEXT,
    image_url VARCHAR(255),
    outcome VARCHAR(255),
    technologies JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    company VARCHAR(100),
    testimonial TEXT NOT NULL,
    rating INT DEFAULT 5,
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog posts table (for future use)
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    author_id INT,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@crackone.com', '$2a$10$XQxBBo8LxOqvOMvzFHVGcuUxKKmJq8G.3MH5KrVWw1xkqGVF8RHXS', 'admin');

-- Insert sample services
INSERT INTO services (title, category, description, icon, features, tech) VALUES
('Custom Software Development', 'software', 'End-to-end software solutions', 'code', '["End-to-end software solutions", "Business process automation", "Scalable enterprise applications", "Startup MVP development"]', '["JavaScript", "React.js", "Node.js", "Express.js", "MySQL"]'),
('Web Application Development', 'software', 'Modern web applications', 'server', '["Single Page Applications (SPA)", "Progressive Web Apps (PWA)", "Admin dashboards & portals", "High-performance platforms"]', '["React.js", "Next.js", "TypeScript", "REST APIs"]'),
('Cloud Application Development', 'cloud', 'Cloud-native applications', 'cloud', '["Cloud-native design", "Serverless applications", "High availability systems", "Multi-cloud architecture"]', '["AWS", "Azure", "Google Cloud", "Lambda"]');

-- Insert sample testimonials
INSERT INTO testimonials (client_name, role, company, testimonial, rating) VALUES
('John Smith', 'CEO', 'TechStart Inc.', 'CrackOne delivered our MVP in record time. Their expertise is exceptional!', 5),
('Sarah Johnson', 'CTO', 'CloudFlow', 'The cloud migration was seamless. Zero downtime and 40% cost reduction.', 5),
('Michael Chen', 'Founder', 'DataSmart', 'Outstanding API development. Clean code and excellent communication.', 5);

-- Indexes for better performance
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created ON contacts(created_at);
CREATE INDEX idx_portfolio_category ON portfolio(category);
CREATE INDEX idx_services_category ON services(category);
