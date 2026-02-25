const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const db = require('../config/db');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email and message required'
            });
        }

        // ✅ SAVE TO DATABASE
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

        // ✅ RESPOND IMMEDIATELY
        res.status(201).json({
            success: true,
            message: "Message received! We'll contact you soon.",
            data: { id: contactId }
        });

        // ================= EMAILS =================

        const notificationHtml = `
            <h2>🚀 New Inquiry Received</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone || 'N/A'}</p>
            <p><b>Service:</b> ${service || 'General Inquiry'}</p>
            <p><b>Company:</b> ${company || 'N/A'}</p>
            <p><b>Message:</b><br>${message.replace(/\n/g,'<br>')}</p>
        `;

        const autoReplyHtml = `
            <h2>Hello ${name.split(' ')[0]} 👋</h2>
            <p>Thank you for contacting <b>CrackOne Technologies</b>.</p>
            <p>We received your inquiry and will respond within 24 hours.</p>
            <p><b>Reference ID:</b> #${contactId || Date.now()}</p>
        `;

        try {
            // 🔹 SEND TO YOU
            await resend.emails.send({
                from: 'CrackOne <onboarding@resend.dev>', // later replace with your domain email
                to: process.env.CONTACT_RECEIVER,        // <-- IMPORTANT change
                subject: `🚀 New Inquiry from ${name}`,
                html: notificationHtml
            });

            // 🔹 AUTO REPLY TO CLIENT
            await resend.emails.send({
                from: 'CrackOne <onboarding@resend.dev>',
                to: email,
                subject: 'We received your message',
                html: autoReplyHtml
            });

            console.log("✅ Emails sent successfully via Resend");

        } catch (mailErr) {
            console.error("❌ Resend mail error:", mailErr.message);
        }

    } catch (err) {
        console.error("Server error:", err);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
});

module.exports = router;