const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Routes


app.use(cors({
    origin: [
        "https://crackonetechnologies.xyz",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());

app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/auth', require('./routes/auth'));

app.get('/api/health',(req,res)=>{
    res.json({status:"ok"});
});

app.get('/',(req,res)=>{
    res.send("CrackOne API running");
});


// 🔥 SMTP TEST ROUTE
app.get('/testmail', async (req,res)=>{
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls:{ rejectUnauthorized:false }
    });

    try{
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject:"SMTP TEST",
            text:"If you receive this, SMTP works"
        });

        console.log("SMTP TEST SUCCESS");
        res.send("MAIL SENT");
    }catch(err){
        console.error("SMTP TEST ERROR:",err);
        res.send("MAIL FAILED");
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});