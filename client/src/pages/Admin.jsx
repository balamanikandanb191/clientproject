import { useState, useEffect } from 'react'
import { FaUsers, FaProjectDiagram, FaEnvelope, FaChartBar, FaPlus, FaEye, FaEdit, FaTrash, FaBolt } from 'react-icons/fa'
import './Admin.css'

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [contacts, setContacts] = useState([])
    const [stats, setStats] = useState({ totalContacts: 0, totalProjects: 0, totalClients: 0, monthlyVisits: 0 })

    useEffect(() => {
        if (isLoggedIn) {
            setContacts([
                { id: 1, name: 'John Smith', email: 'john@example.com', service: 'Web Development', status: 'new', date: '2024-01-15' },
                { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', service: 'Cloud Migration', status: 'read', date: '2024-01-14' },
                { id: 3, name: 'Michael Chen', email: 'michael@startup.io', service: 'SaaS Development', status: 'replied', date: '2024-01-13' }
            ])
            setStats({ totalContacts: 45, totalProjects: 12, totalClients: 28, monthlyVisits: 3250 })
        }
    }, [isLoggedIn])

    const handleLogin = (e) => {
        e.preventDefault()
        if (loginData.email && loginData.password) setIsLoggedIn(true)
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
        { id: 'contacts', label: 'Contacts', icon: <FaEnvelope /> },
        { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
        { id: 'clients', label: 'Clients', icon: <FaUsers /> }
    ]

    if (!isLoggedIn) {
        return (
            <div className="admin-page">
                <div className="admin-login-wrapper">
                    <div className="admin-login-card glass-card">
                        <div className="login-logo"><FaBolt className="login-bolt" /><span>CrackOne</span></div>
                        <h2>Admin Login</h2>
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <p className="demo-note">Demo: Enter any email/password</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <div className="sidebar-header"><FaBolt /><span>Admin</span></div>
                    <nav className="sidebar-nav">
                        {tabs.map((tab) => (
                            <button key={tab.id} className={`sidebar-link ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                                {tab.icon}<span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                    <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </aside>
                <main className="admin-main">
                    <header className="admin-header">
                        <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
                        <button className="btn btn-primary"><FaPlus /> Add New</button>
                    </header>
                    <div className="admin-content">
                        {activeTab === 'dashboard' && (
                            <>
                                <div className="stats-grid">
                                    <div className="stat-card"><div className="stat-icon"><FaEnvelope /></div><div className="stat-info"><span className="stat-value">{stats.totalContacts}</span><span className="stat-label">Contacts</span></div></div>
                                    <div className="stat-card"><div className="stat-icon"><FaProjectDiagram /></div><div className="stat-info"><span className="stat-value">{stats.totalProjects}</span><span className="stat-label">Projects</span></div></div>
                                    <div className="stat-card"><div className="stat-icon"><FaUsers /></div><div className="stat-info"><span className="stat-value">{stats.totalClients}</span><span className="stat-label">Clients</span></div></div>
                                    <div className="stat-card"><div className="stat-icon"><FaChartBar /></div><div className="stat-info"><span className="stat-value">{stats.monthlyVisits}</span><span className="stat-label">Visits</span></div></div>
                                </div>
                                <div className="dashboard-section">
                                    <h3>Recent Contacts</h3>
                                    <div className="data-table">
                                        <table>
                                            <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Actions</th></tr></thead>
                                            <tbody>
                                                {contacts.map((c) => (
                                                    <tr key={c.id}>
                                                        <td>{c.name}</td><td>{c.email}</td><td>{c.service}</td>
                                                        <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                                                        <td><div className="action-btns"><button className="action-btn"><FaEye /></button><button className="action-btn"><FaEdit /></button><button className="action-btn"><FaTrash /></button></div></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab !== 'dashboard' && <div className="dashboard-section"><h3>{tabs.find(t => t.id === activeTab)?.label}</h3><p>Feature coming soon with backend integration.</p></div>}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Admin
