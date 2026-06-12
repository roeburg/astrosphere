import nodemailer from "nodemailer";

const MAIL_HOST = "smtp.gmail.com";
const MAIL_USER = "sahilthakur6164@gmail.com";
const MAIL_PASS = "eweknmzipxhttocg"; // Gmail App Password

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

// optional: verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP FULL ERROR");
    console.log(error);
  } else {
    console.log("✅ Mailer ready to send emails");
  }
});

export default transporter;
