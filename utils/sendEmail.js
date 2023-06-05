import nodemailer from 'nodemailer'

// Create a transporter using your environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


async function sendEmail(to, subject, text) {
    try {
      // Send the email using the configured transporter
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender email address
        to, // Recipient email address
        subject, // Email subject
        text, // Email content
      });
      console.log('Email sent successfully!');
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  export default sendEmail;