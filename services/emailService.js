const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // replace with your Gmail email
    pass: 'your_email_password',  // replace with your Gmail password
  },
});

const sendTicketEmail = async (toEmail, ticketInfo) => {
  const mailOptions = {
    from: 'your_email@gmail.com', // replace with your Gmail email
    to: toEmail,
    subject: 'Ticket Information',
    text: `Thank you for booking! Here is your ticket information:\n\n${ticketInfo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Ticket email sent successfully');
  } catch (error) {
    console.error('Error sending ticket email:', error);
  }
};

module.exports = {
  sendTicketEmail,
};
