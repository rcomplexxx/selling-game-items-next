import sendEmail from '../../utils/sendEmail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    try {
      await sendEmail(to, subject, text);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}