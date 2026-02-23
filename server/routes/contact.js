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

transporter.verify(function(error) {
    if (error) console.error("SMTP connection error:", error);
    else console.log("SMTP server ready to send mails");
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success:false, error:'Name, email and message required'});
        }

        // Save to DB
        let contactId = null;
        try{
            const [result] = await db.execute(
                'INSERT INTO contacts (name,email,phone,company,service,message) VALUES (?,?,?,?,?,?)',
                [name,email,phone||'',company||'',service||'',message]
            );
            contactId = result.insertId;
        }catch(dbErr){
            console.error("DB error:", dbErr.message);
        }

        // Mail to company
        const notificationMailOptions = {
            from: `"CrackOne" <${authUser}>`,
            to: process.env.SMTP_USER,
            cc: process.env.SMTP_CC,
            subject: `New inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Service: ${service || 'N/A'}

Message:
${message}
`
        };

        // Auto reply
        const autoReplyMailOptions = {
            from: `"CrackOne" <${authUser}>`,
            to: email,
            subject: 'We received your message!',
            text: `
Hi ${name},

Thanks for contacting CrackOne Technologies.
We received your message and will reply soon.

Reference ID: ${contactId || Date.now()}

- CrackOne Team
`
        };

        // 🔥 IMPORTANT — await mails
        try{
            await transporter.sendMail(notificationMailOptions);
            await transporter.sendMail(autoReplyMailOptions);
            console.log("Mail sent successfully");
        }catch(mailErr){
            console.error("Mail sending failed:", mailErr);
        }

        res.status(201).json({
            success:true,
            message:"Message stored and mail attempted",
            data:{ id: contactId }
        });

    }catch(err){
        console.error("Server error:", err);
        res.status(500).json({ success:false, error:'Server error'});
    }
});

module.exports = router;