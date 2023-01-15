const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    const message = {
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation at ${process.env.API_URL}`,
      text: "",
      html: `
        <div>
          <h1>For activation click this link<h1>
          <a href="${link}">${link}</a>
        <div>
      `,
    };

    await this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = new MailService();
