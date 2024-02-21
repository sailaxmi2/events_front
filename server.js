const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());

const sendEmail = (to, subject, text) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sachieventsmarketing@gmail.com',
      pass: 'njadnczlsxcphdva',
    },
  });

  const mailOptions = {
    from: 'sachieventsmarketing@gmail.com',
    to: to,
    subject: subject,
    html: text, // Use HTML instead of plain text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.post('/generateUniqueNumber', (req, res) => {
  const data = req.body;
  const uniqueNumber = crypto.randomBytes(3).toString('hex').toUpperCase();
  console.log(`Received Email: ${data.email}`);

  const emailMessage = `
    <html>
      <body>
        <p>Hi ${data.name},</p>
        <p>You have successfully registered for the Women's Day Event scheduled on ${data.Eventdate}.</p>
        <p>Your unique ID is<Strong> ${uniqueNumber}</Strong>. We look forward to having you at the event!</p>
        <p>Best Regards,<br/>Sachi Events</p>
      </body>
    </html>
  `;

  sendEmail(data.email, 'Sachi Events - Registration Confirmation', emailMessage);

  res.json({ uniqueNumber, email: data.email });
});

app.listen(4000, () => {
  console.log('Server started  http://localhost:4000');
  console.log('Server Started!');
});
