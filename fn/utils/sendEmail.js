const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });
    await transporter.sendMail(message, (err, info) => {
        if (err) {
            return err;
        }
        transporter.close();
    });
}

module.exports = sendEmail;