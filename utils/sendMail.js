const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html = null, attachments = []) => {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your app password or Gmail password
      },
    });

    // Set up email options, including attachments
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
      attachments, // Attachments if any (empty array by default)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;
