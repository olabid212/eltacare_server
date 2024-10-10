const Application = require('../models/applicationModel');
const sendEmail = require("../utils/sendMail");
const path = require('path');
const fs = require('fs');

exports.submitApplication = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, interestedPosition, coverLetter } = req.body;

    // Log the uploaded file to ensure multer is working correctly
    console.log('Uploaded File:', req.file);

    // Parse the workExperience field, as it's sent as a string in multipart/form-data
    let workExperience;
    try {
      workExperience = JSON.parse(req.body.workExperience);
    } catch (parseError) {
      console.error('Work experience parsing error:', parseError);
      return res.status(400).json({ message: 'Invalid format for work experience' });
    }

    const cv = req.file ? req.file.filename : null;

    if (!cv) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    // Save application to the database
    const newApplication = await Application.create({
      firstName,
      lastName,
      email,
      phone,
      interestedPosition,
      coverLetter,
      workExperience,
      cv,
    });

    const cvPath = path.join(__dirname, '../uploads/', cv);
    if (!fs.existsSync(cvPath)) {
      console.error('CV file not found:', cvPath);
      return res.status(500).json({ message: 'CV file not found on server' });
    }

    // Format work experience into a readable list
    const formattedWorkExperience = workExperience.map((item, index) => `
      <p><strong>Work Experience ${index + 1}:</strong></p>
      <p><strong>Position:</strong> ${item.position}</p>
      <p><strong>Company Name:</strong> ${item.companyName}</p>
    `).join('<br>');

    // HTML email content for the applicant
    const applicantHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h3 style="color: purple;">Dear ${firstName} ${lastName},</h3>
          <p>We have received your application for the position of <strong>${interestedPosition}</strong>.</p>
          <p>Our team will review your application and get back to you shortly.</p>
          <p>If you have any questions, feel free to reach out to us at <a href="mailto:info@eltahealthcare.com">info@eltahealthcare.com</a>.</p>
          <br>
          <p>Best regards,</p>
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

    // HTML email content for the company with formatted work experience
    const companyHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h2 style="color: purple;">New Application Submitted</h2>
          <p>An application has been submitted by <strong>${firstName} ${lastName}</strong> for the position of <strong>${interestedPosition}</strong>.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Cover Letter:</strong> ${coverLetter}</p>
          ${formattedWorkExperience}
          <p>The CV is attached to this email.</p>
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

    const attachments = cv ? [
      {
        filename: cv,  // The name of the CV file
        path: cvPath,  // Full path to the CV file
        contentType: 'application/pdf', // Assuming PDF for the CV, adjust if necessary
      },
    ] : [];

    // Send acknowledgment email to the applicant
    await sendEmail(
      email,
      'Application Received',
      `Dear ${firstName},\n\nWe have received your application for the position of ${interestedPosition}. Our team will review your application and get back to you shortly.\n\nThank you for applying!\nBest regards,\nElta Healthcare`,
      applicantHtmlContent // Send HTML content
    );

    // Send notification email to the company with CV attachment
    await sendEmail(
      process.env.RECEIVER_EMAIL,
      'New Application Submitted',
      `A new application has been submitted by ${firstName} ${lastName} for the position of ${interestedPosition}.\n\nThe CV is attached to this email.`,
      companyHtmlContent,
      attachments // Attach the CV if available
    );

    res.status(201).json({ message: 'Application submitted successfully', newApplication });
  } catch (error) {
    console.error('Error submitting application:', error.message);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
};
