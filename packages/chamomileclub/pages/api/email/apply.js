import transporter from "../../../lib/nodemailer";

export default async function sendApplication(req, res) {
  const applicationData = req.body;

  try {
    const emailSubject = `New Applicant For ${applicationData.position} Position`;

    const mappedFields = Object.entries(applicationData)
      .map(field => `${field[0]}: ${field[1]}`)

    const mailData = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: emailSubject,
      text: mappedFields.join("\n"),
      html: mappedFields.map(field => `<p>${field}</p>`).join("")
    }

    await transporter.sendMail(mailData);

    res.status(200).json({ error: null, message: "Application sent successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Application Was Unsuccessfully"});
  }
}
