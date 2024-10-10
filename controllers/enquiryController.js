const Enquiry = require("../models/enquiryModel");
const sendEmail = require("../utils/sendMail");

exports.sendEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, comments } = req.body;

    // Save enquiry to the database
    const newEnquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      subject,
      comments,
    });

    // HTML email content for the applicant
    const applicantHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h3 style="color: purple;">Dear ${firstName} ${lastName},</h3>
          <p>Thank you for your enquiry regarding <strong>"${subject}"</strong>. Our team will get back to you shortly.</p>
          <p>We appreciate your interest in Elta Health, and we are committed to providing you with the best possible service.</p>
          <p>If you have any further questions, feel free to reach out to us at <a href="mailto:info@eltahealthcare.com">info@eltahealthcare.com</a>.</p>
          <br>
          <p>Best regards,</p>
          <p><b>Elta HealthCare,</b></p>
        </div>
        <hr>
        <div style="text-align: center; font-size: 12px; background-color: purple; color: white; padding: 10px">
          <p>Elta HealthCare © 2024 | All rights reserved.</p>
          <p>Follow us on <a href="https://eltahealthcare.com/">Facebook</a> | <a href="https://eltahealthcare.com/">Twitter</a> | <a href="https://eltahealthcare.com/">Instagram</a></p>
        </div>
      </body>
      </html>
    `;

    // HTML email content for the company
    const companyHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h2 style="color: purple;">New Enquiry Received</h2>
          <p>A new enquiry has been received from: <strong>${firstName} ${lastName}</strong></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Comments:</strong> ${comments}</p>
          <br>
          <p><b>Elta HealthCare</b></p>
        </div>
        <hr>
        <div style="text-align: center; font-size: 12px; background-color: purple; color: white; padding: 10px;">
          <p>Elta HealthCare © 2024 | All rights reserved.</p>
          <p>Follow us on <a href="https://eltahealthcare.com/">Facebook</a> | <a href="https://eltahealthcare.com/">Twitter</a> | <a href="https://eltahealthcare.com/">Instagram</a></p>
        </div>
      </body>
      </html>
    `;

    // Send acknowledgment email to the applicant with HTML content
    await sendEmail(
      email, // Applicant's email
      'Enquiry Received', // Subject
      `Dear ${firstName} ${lastName},\n\nThank you for your enquiry regarding "${subject}". Our team will get back to you shortly.\n\nBest regards,\nThe Elta Health Team`, // Text fallback content
      applicantHtmlContent // HTML content
    );

    // Send notification email to the company with HTML content
    await sendEmail(
      process.env.RECEIVER_EMAIL, // Company's email (from environment variables)
      'New Enquiry Received', // Subject
      `A new enquiry has been received from ${firstName} ${lastName} (${email}).\n\nSubject: ${subject}\nComments: ${comments}`, // Text fallback content
      companyHtmlContent // HTML content for the company
    );

    // Return success response
    res.status(201).json({ message: 'Enquiry submitted successfully', newEnquiry });
  } catch (error) {
    console.error('Error submitting enquiry:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Error submitting enquiry', error });
  }
};
