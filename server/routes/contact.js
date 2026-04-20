const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

// Configure Nodemailer with Zoho SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.in',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify SMTP connection on startup (optional but helpful for logs)
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error.message);
    } else {
        console.log('✅ SMTP Server is ready to send messages');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email and message are required'
            });
        }

        // ✅ 1. Save Inquiry to DynamoDB
        let contactId = Date.now().toString(); 
        try {
            await db.send(new PutCommand({
                TableName: "clientproject-contacts",
                Item: {
                    contactId: contactId,
                    name: name,
                    email: email,
                    phone: phone || 'N/A',
                    company: company || 'N/A',
                    service: service || 'General Inquiry',
                    message: message,
                    createdAt: new Date().toISOString()
                }
            }));
            console.log("✅ Contact saved to DynamoDB successfully");
        } catch (dbErr) {
            console.error("❌ DB error (Handled):", dbErr.message);
            // We continue even if DB fails so user gets the email
        }

        // ✅ 2. Prepare Email Lists
        const adminEmail = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;
        const ccList = (process.env.CONTACT_CC || "")
            .split(',')
            .map(e => e.trim())
            .filter(Boolean);

        // ✅ 3. HTML Templates
        const notificationHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background-color: #1a1a2e; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 600;">🚀 New Inquiry Received</h2>
    </div>
    <div style="padding: 30px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border-left: 4px solid #4e54c8;">
            <p style="margin: 10px 0;"><strong style="color: #666;">Name:</strong> <span style="font-size: 16px; color: #333;">${name}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #666;">Email:</strong> <a href="mailto:${email}" style="color: #4e54c8; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #666;">Phone:</strong> <span style="color: #333;">${phone || 'N/A'}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #666;">Service:</strong> <span style="background-color: #e8eaf6; color: #3f51b5; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">${service || 'General Inquiry'}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #666;">Company:</strong> <span style="color: #333;">${company || 'N/A'}</span></p>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ff9800;">
            <h3 style="margin-top: 0; color: #333; font-size: 16px;">Message:</h3>
            <p style="color: #444; line-height: 1.6; margin-bottom: 0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
    </div>
    <div style="background-color: #eeeeee; padding: 15px; text-align: center; color: #888; font-size: 12px;">
        &copy; ${new Date().getFullYear()} CrackOne Technologies. All rights reserved.
    </div>
</div>`;

        const autoReplyHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background-color: #1a1a2e; color: #ffffff; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: 1px; color: #ffffff;">CrackOne <span style="color: #4e54c8;">Technologies</span></h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: #a1a1aa;">Software Development & Cloud Solutions</p>
    </div>
    <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #2d3748; margin-top: 0; font-size: 22px;">Hello ${name.split(' ')[0]} 👋,</h2>
        <p style="color: #4a5568; line-height: 1.7; font-size: 16px;">Thank you for reaching out to <strong>CrackOne Technologies</strong>. We have successfully received your inquiry and our team is currently reviewing your request.</p>
        
        <div style="background-color: #f8fafc; padding: 18px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4e54c8; text-align: center;">
            <p style="margin: 0; color: #4a5568; font-weight: 500; font-size: 15px;">Your Reference ID</p>
            <p style="margin: 5px 0 0; color: #4e54c8; font-weight: 700; font-size: 20px;">#${contactId}</p>
        </div>

        <p style="color: #4a5568; line-height: 1.7; font-size: 16px;">One of our technical experts will get back to you within <strong>24 hours</strong> to discuss how we can help achieve your goals.</p>
        
        <p style="color: #4a5568; line-height: 1.7; font-size: 16px; margin-bottom: 0; margin-top: 30px;">Best Regards,<br><strong style="color: #2d3748;">The CrackOne Team</strong></p>
    </div>
    <div style="background-color: #1a1a2e; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} CrackOne Technologies. All rights reserved.</p>
        <p style="margin: 8px 0 0; font-size: 11px;">This is an automated message, please do not reply to this email.</p>
    </div>
</div>`;

        // ✅ 4. Send Emails in background (to not keep client waiting)
        // We'll return success to client, then try sending mails
        res.status(201).json({
            success: true,
            message: "Inquiry received successfully!",
            id: contactId
        });

        // Background Mail Sending
        try {
            // 🔹 Admin Notification
            await transporter.sendMail({
                from: `"CrackOne Notifications" <${process.env.SMTP_USER}>`,
                to: adminEmail,
                cc: ccList,
                subject: `🚀 New Inquiry from ${name}`,
                html: notificationHtml
            });
            console.log("📬 Admin notification sent via Zoho");

            // 🔹 Client Auto-Reply
            await transporter.sendMail({
                from: `"CrackOne Technologies" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'We received your message - CrackOne Technologies',
                html: autoReplyHtml
            });
            console.log("📬 Client auto-reply sent via Zoho");

        } catch (mailErr) {
            console.error("❌ Mail Sending Error (Handled):", mailErr.message);
        }

    } catch (err) {
        console.error("❌ Server error in /api/contact:", err);
        if (!res.headersSent) {
            res.status(500).json({ 
                success: false, 
                error: 'Internal server error occurred',
                details: err.message 
            });
        }
    }
});

module.exports = router;