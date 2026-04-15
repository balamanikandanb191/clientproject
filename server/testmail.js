require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('--- ENV CHECK ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 'MISSING');
console.log('SMTP_PASS value:', process.env.SMTP_PASS);
console.log('-----------------');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: { rejectUnauthorized: false }
});

transporter.verify((err, success) => {
    if (err) {
        console.error('❌ SMTP Verify Failed:', err.message);
    } else {
        console.log('✅ SMTP Connected! Sending test mail...');
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'CrackOne Test Mail',
            text: 'Mail is working!'
        }, (err2, info) => {
            if (err2) console.error('❌ Send Failed:', err2.message);
            else console.log('✅ Mail Sent! ID:', info.messageId);
        });
    }
});
