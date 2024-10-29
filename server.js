const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer(); // Multer configuration for handling multipart form data
const app = express();
const PORT = process.env.PORT || 3000;
let email;
// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('YoutubeOne')); // Serve static files (HTML, CSS, JS) from 'public' directory
require('dotenv').config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change if using a different provider
    // host: 'smtp.sendgrid.net',
    // port: 587,
    auth: {
        user: process.env.EMAIL,  // Using environment variable for email
        pass: process.env.PASSWORD // Using environment variable for password
    }
});

// Route to handle form submissions
app.post('/send', upload.none(), (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Received: Name=${name}, Email=${email}, Message=${message}`);
    this.email = email;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    if (!message) {
        return res.status(400).send('Message is required');
    }
    if(!name){
        return res.status(400).send('Name is required');
    }
    const mailOptions = {
        from: this.email,
        to: process.env.EMAIL, // Change this to your email address
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
