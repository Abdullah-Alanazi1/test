// Looking to send emails in production? Check out our Email API/SMTP product!

import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "1456a3916f7b23579867c6d36b0b5011";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3334619,
  })
);

const sender = {
  address: "abdullahm.alanazi2024@gmail.com",
  name: "Mailtrap Test",
};
const recipients = ["abdullahm.alanazi2024@gmail.com"];
export default async (to, subject, text) => {
  try {
    await transport.sendMail({
      from: sender,
      to,
      subject,
      text,
      category: "Integration Test",
      sandbox: true,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
