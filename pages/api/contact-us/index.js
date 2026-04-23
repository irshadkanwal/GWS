import { sendEmail } from "@/utilities/helpers/emailService";
import methodHandler from "@/utils/requestHandler";

async function postHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { name, email, phone, message } = req.body;

  const RECEIVER_EMAIL = process.env.EMAIL_SENDER;

  try {
    await sendEmail(
      RECEIVER_EMAIL,
      `Contact Us Message from ${name}`,
      `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Email sending failed" });
  }
}

export default methodHandler({
  POST: postHandler,
});
