const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const db = require('../config/db'); // Database connection pool

// Nodemailer Transporter Configuration
const authUser = (process.env.SMTP_USER || 'crackonetechnologies@gmail.com').split(',')[0].trim();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: authUser,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});
transporter.verify(function(error, success) {
    if (error) {
        console.error("SMTP connection error:", error);
    } else {
        console.log("SMTP server ready to send mails");
    }
});
// GET - All contacts (for admin)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Database error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

// POST - Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
        }

        console.log('📧 New contact submission received');

        // 1. Save to Database
        let contactId = null;
        try {
            const [result] = await db.execute(
                'INSERT INTO contacts (name, email, phone, company, service, message) VALUES (?, ?, ?, ?, ?, ?)',
                [name, email, phone || '', company || '', service || '', message]
            );
            contactId = result.insertId;
            console.log('✅ Stored in database with ID:', contactId);
        } catch (dbError) {
            console.error('❌ Database storage failed:', dbError.message);
            // Fallback: Log to local file
            const logEntry = `[${new Date().toISOString()}] Name: ${name}, Email: ${email}, Message: ${message}\n`;
            fs.appendFileSync(path.join(__dirname, '../contacts_backup.log'), logEntry);
            console.log('⚠️ Database error fallback: Submission backed up to contacts_backup.log');
        }

        // 2. Prepare Company Notification Email
        const notificationMailOptions = {
            from: `"CrackOne Notifications" <${authUser}>`,
            to: process.env.SMTP_USER,
            cc: process.env.SMTP_CC,
            subject: `🚀 New Project Inquiry from ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px;">
                    <h2 style="color: #00ff88; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">New Contact Submission</h2>
                    <div style="background: #f8fdfa; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <p style="margin-bottom: 10px;"><strong>👤 Name:</strong> ${name}</p>
                        <p style="margin-bottom: 10px;"><strong>✉️ Email:</strong> ${email}</p>
                        <p style="margin-bottom: 10px;"><strong>📞 Phone:</strong> ${phone || 'N/A'}</p>
                        <p style="margin-bottom: 10px;"><strong>🏢 Company:</strong> ${company || 'N/A'}</p>
                        <p style="margin-bottom: 10px;"><strong>💡 Service:</strong> ${service || 'Default Service'}</p>
                    </div>
                    <div style="padding: 20px; background: #ffffff; border-left: 4px solid #00ff88; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
                        <p style="line-height: 1.8; color: #444;">${message}</p>
                    </div>
                    <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">This is an automated notification from CrackOne Technologies Website.</p>
                </div>
            `
        };

        // 3. Prepare Auto-Reply Email for Customer
        const autoReplyMailOptions = {
            from: `"CrackOne Technologies" <${authUser}>`,
            to: email,
            subject: 'Thank you for reaching out to CrackOne Technologies!',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; background: #000000; color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://crackone.com/logo.png" alt="CrackOne Logo" style="height: 50px; border-radius: 50%;">
                    </div>
                    <h2 style="color: #00ff88; text-align: center;">Hello ${name}!</h2>
                    <p style="line-height: 1.8; font-size: 16px;">
                        Thank you for contacting <strong>CrackOne Technologies</strong>. We've received your inquiry about <strong>${service || 'our services'}</strong>.
                    </p>
                    <p style="line-height: 1.8; font-size: 16px;">
                        Our team is currently reviewing your message and we will get back to you within 24 hours to discuss how we can help transform your ideas into reality.
                    </p>
                    <div style="margin: 30px 0; padding: 20px; background: rgba(0, 255, 136, 0.1); border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-weight: bold;">Reference Inquiry ID: #${contactId || 'REQ' + Date.now()}</p>
                    </div>
                    <p style="font-size: 16px;">
                        Warm regards,<br>
                        <strong>The CrackOne Team</strong>
                    </p>
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;">
                    <p style="font-size: 12px; color: #888; text-align: center;">
                        CrackOne Technologies | Software Development & Cloud Solutions<br>
                        98428 36526 | Erode, Tamilnadu
                    </p>
                </div>
            `
        };

        // 4. Send Emails (attempt both)
        Promise.all([
            transporter.sendMail(notificationMailOptions),
            transporter.sendMail(autoReplyMailOptions)
        ])
            .then(() => console.log('✅ All notification emails sent successfully'))
            .catch(mailError => {
                console.error('❌ Email notification partial/full failure:', mailError.message);
                // We don't fail the whole request since data is already saved
            });

        res.status(201).json({
            success: true,
            message: 'Message received! We will get back to you soon.',
            data: { id: contactId }
        });
    } catch (error) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// GET - Single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, error: 'Contact not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// PATCH - Update contact status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ success: false, error: 'Status is required' });

        await db.execute('UPDATE contacts SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// DELETE - Delete contact
router.delete('/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM contacts WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

module.exports = router;
