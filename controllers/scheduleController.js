const Schedule = require('../models/scheduleModel');
const sendEmail = require("../utils/sendMail");

exports.createSchedule = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, date, time, services, comments } = req.body;

    // Save the appointment to the database
    const newSchedule = await Schedule.create({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      date,
      time,
      services,
      comments,
    });

    // HTML email content for the user
    const userHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h3 style="color: purple;">Dear ${name},</h3>
          <p>Your appointment has been successfully scheduled for <strong>${date}</strong> at <strong>${time}</strong>.</p>
          <p>Service: <strong>${services}</strong></p>
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

    // HTML email content for the company
    const companyHtmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dytiwfqmq/image/upload/v1727953517/elta_aduytt.png" alt="Elta Health Logo" style="width: 150px;">
        </div>
        <div style="margin: 20px;">
          <h2 style="color: purple;">New Appointment Scheduled</h2>
          <p>An appointment has been scheduled by <strong>${name}</strong>.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Service:</strong> ${services}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}, ${city}, ${state}, ${zip}</p>
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

    // Send acknowledgment email to the user
    await sendEmail(
      email, 
      'Appointment Scheduled', 
      `Dear ${name},\n\nYour appointment has been scheduled successfully for ${date} at ${time}.\n\nService: ${services}\n\nThank you for choosing us.\nBest regards,\nElta Healthcare`, 
      userHtmlContent // Send HTML content
    );

    // Send notification email to the company
    await sendEmail(
      process.env.RECEIVER_EMAIL,
      'New Appointment Scheduled', 
      `A new appointment has been scheduled by ${name} (${email}).\n\nDetails:\nDate: ${date}\nTime: ${time}\nService: ${services}\nPhone: ${phone}\nAddress: ${address}, ${city}, ${state}, ${zip}\nComments: ${comments}`, 
      companyHtmlContent // Send HTML content
    );

    // Return success response
    res.status(201).json({ message: 'Appointment scheduled successfully', newSchedule });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ message: 'Error scheduling appointment', error: error.message });
  }
};
