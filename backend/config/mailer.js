import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: "ae73cd001@smtp-brevo.com",
    pass: "xsmtpsib-ee18e0ca5113e1a7287653c6705cf75d9826465b3b8f5d2c158d8db510e5e21a-nmbjmr9E1r5zurKp",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ Brevo SMTP Connected");
  }
});

export default transporter;
