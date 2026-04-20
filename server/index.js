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


// 🔥 EMAIL TEST ROUTE (VIA RESEND)
app.get('/testmail', async (req,res)=>{
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    try{
        const result = await resend.emails.send({
            from: 'Test <onboarding@resend.dev>',
            to: process.env.SMTP_USER,
            subject: "RESEND TEST",
            text: "If you receive this, Resend works on Render!"
        });

        if (result.error) {
            console.error("RESEND TEST ERROR:", result.error);
            return res.status(500).json(result.error);
        }

        console.log("RESEND TEST SUCCESS:", result.data.id);
        res.send("MAIL SENT VIA RESEND");
    }catch(err){
        console.error("RESEND TEST ERROR:",err);
        res.status(500).send("MAIL FAILED");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 CrackOne Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});