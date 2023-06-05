import nodemailer from 'nodemailer'

// Create a transporter using your environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'rcomplexx@outlook.com',
    pass: 'Dragonoid1!',
  },
});


async function sendEmail(to, subject, text) {
    try {
      // Send the email using the configured transporter
      await transporter.verify();
      const result = await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender email address
        to, // Recipient email address
        subject, // Email subject
        text, // Email content
      });
      console.log('Email sent successfully!');
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  
  export default sendEmail;