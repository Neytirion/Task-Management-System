import {mailtrapClient, sender} from "./mailtrap.config.js";
import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
      category: 'verification'
    })
    console.log("Email sent: Success", response)
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "559aaee3-6d33-43db-9faf-e63e44e42a61",
      template_variables: {
        "company_info_name": "Auth Test",
        "name": name
      }
    })
    console.log("Email sent: Success", response)
  } catch (error) {
    console.log("Error sending email: ", error)
    throw new Error(`Error sending email: ${error}`);
  }
}