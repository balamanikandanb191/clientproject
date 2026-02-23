const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../config/db');

// Nodemailer transporter
const authUser = process.env.SMTP_USER;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: authUser,
        pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false }
});

transporter.verify(function (error) {
    if (error) console.error("SMTP connection error:", error);
    else console.log("SMTP server ready to send mails");
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Name, email and message required' });
        }

        // Save to DB
        let contactId = null;
        try {
            const [result] = await db.execute(
                'INSERT INTO contacts (name,email,phone,company,service,message) VALUES (?,?,?,?,?,?)',
                [name, email, phone || '', company || '', service || '', message]
            );
            contactId = result.insertId;
        } catch (dbErr) {
            console.error("DB error:", dbErr.message);
        }

        // Send response immediately to avoid timeout/slowness
        res.status(201).json({
            success: true,
            message: "Message received! We will get back to you soon.",
            data: { id: contactId }
        });

        // 🔥 BACKGROUND EMAIL PROCESSING
        (async () => {
            const ccList = (process.env.SMTP_CC || '').split(',').map(s => s.trim()).filter(Boolean);

            const emailStyles = `
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                    .header { background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 30px; text-align: center; color: white; }
                    .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
                    .content { padding: 30px; }
                    .info-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin-bottom: 25px; }
                    .info-item { padding: 12px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #6366f1; }
                    .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 4px; }
                    .value { font-size: 16px; color: #1e293b; }
                    .message-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px; font-style: italic; }
                    .footer { text-align: center; padding: 20px; font-size: 12px; color: #94a3b8; background: #f8fafc; }
                    .btn { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
                </style>
            `;

            const notificationHtml = `
                <!DOCTYPE html>
                <html>
                <head>${emailStyles}</head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Project Inquiry</h1>
                        </div>
                        <div class="content">
                            <div class="info-grid">
                                <div class="info-item">
                                    <div class="label">Client Name</div>
                                    <div class="value">${name}</div>
                                </div>
                                <div class="info-item">
                                    <div class="label">Email Address</div>
                                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                                </div>
                                <div class="info-item">
                                    <div class="label">Phone Number</div>
                                    <div class="value">${phone || 'Not provided'}</div>
                                </div>
                                <div class="info-item">
                                    <div class="label">Service Requested</div>
                                    <div class="value">${service || 'General Inquiry'}</div>
                                </div>
                                <div class="info-item">
                                    <div class="label">Company</div>
                                    <div class="value">${company || 'Not provided'}</div>
                                </div>
                            </div>
                            <div class="label">Message:</div>
                            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="footer">
                            Sent from CrackOne Technologies Contact Form
                        </div>
                    </div>
                </body>
                </html>
            `;

            const autoReplyHtml = `
                <!DOCTYPE html>
                <html>
                <head>${emailStyles}</head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Hello ${name.split(' ')[0]}!</h1>
                        </div>
                        <div class="content" style="text-align: center;">
                            <h2>We've Received Your Message</h2>
                            <p>Thank you for reaching out to <strong>CrackOne Technologies</strong>. Our team has been notified and we are currently reviewing your inquiry.</p>
                            <p>One of our specialists will get back to you within 24 hours.</p>
                            
                            <div style="margin: 30px 0;">
                                <div class="label">Your Inquiry Reference</div>
                                <div style="font-size: 20px; font-weight: bold; color: #6366f1;">#${contactId || Date.now().toString().slice(-6)}</div>
                            </div>

                            <a href="https://crackone.in" class="btn">Visit Our Website</a>
                        </div>
                        <div class="footer">
                            &copy; ${new Date().getFullYear()} CrackOne Technologies. All rights reserved.
                        </div>
                    </div>
                </body>
                </html>
            `;

            const notificationMailOptions = {
                from: `"CrackOne Notifications" <${authUser}>`,
                to: process.env.SMTP_USER,
                bcc: ccList,
                subject: `🚀 Inquiry: ${service} from ${name}`,
                html: notificationHtml
            };

            const autoReplyMailOptions = {
                from: `"CrackOne Technologies" <${authUser}>`,
                to: email,
                subject: 'Thank you for contacting CrackOne!',
                html: autoReplyHtml
            };

            try {
                console.log(`[Background] Attempting to send HTML notification...`);
                await transporter.sendMail(notificationMailOptions);
                console.log("[Background] Notification mail sent successfully.");

                console.log(`[Background] Attempting to send HTML auto-reply to ${email}...`);
                await transporter.sendMail(autoReplyMailOptions);
                console.log("[Background] Auto-reply mail sent successfully.");
            } catch (mailErr) {
                console.error("[Background] Mail error:", mailErr.message);
            }
        })();

    } catch (err) {
        console.error("Server error:", err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});

module.exports = router;