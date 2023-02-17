import transporter from "../../../lib/nodemailer";

export default async function sendSubscription(req, res) {
  const email = req.body.email;

  try {
    const emailSubject = `New Subscription Request`;

    const mailData = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: emailSubject,
      text: `Email: ${email}`,
      html: `<div>Email: ${email}</div>`
    }

    await transporter.sendMail(mailData);

    res.status(200).json({ error: null, message: "Application sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Application Was Unsuccessfully" });
  }
}
