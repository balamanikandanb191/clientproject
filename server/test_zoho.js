const nodemailer = require('nodemailer');

const hosts = [
    {host: 'smtp.zoho.in', port: 465, secure: true},
    {host: 'smtp.zoho.com', port: 465, secure: true},
    {host: 'smtp.zoho.in', port: 587, secure: false},
    {host: 'smtp.zoho.com', port: 587, secure: false}
];

async function testHosts() {
    const user = 'admin@crackonetechnologies.xyz';
    const pass = 'kyysnzD9ufdL';

    for(const h of hosts) {
        console.log(`Trying Zoho ${h.host}:${h.port}...`);
        try {
            const transporter = nodemailer.createTransport({
                host: h.host,
                port: h.port, 
                secure: h.secure,
                auth: { user, pass },
                tls: { rejectUnauthorized: false }
            });
            await new Promise((resolve, reject) => {
                transporter.verify((err, success) => {
                    if (err) reject(err); else resolve(success);
                });
            });
            console.log(`✅ SUCCESS on ${h.host}:${h.port}`);
            return;
        } catch(e) {
            console.log(`❌ Failed: ${e.message}`);
        }
    }
}
testHosts();
