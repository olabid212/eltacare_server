const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  // Your multer upload middleware
const { submitApplication } = require("../controllers/applicationController");

/**
 * @swagger
 * /api/apply:
 *   post:
 *     summary: Submit a job application
 *     tags:
 *       - Application to join Elta Healthcare
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Applicant's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Applicant's last name
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Applicant's email address
 *                 format: email
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 description: Applicant's phone number
 *                 example: 1234567890
 *               interestedPosition:
 *                 type: string
 *                 description: Position the applicant is interested in
 *                 example: Software Engineer
 *               coverLetter:
 *                 type: string
 *                 description: Applicant's cover letter
 *                 example: I am interested in the role because...
 *               workExperience:
 *                 type: array
 *                 description: List of work experiences
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                       description: Job title
 *                       example: Software Developer
 *                     companyName:
 *                       type: string
 *                       description: Company name
 *                       example: ABC Tech
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: Applicant's CV file in .pdf, .doc, or .docx format
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid input, such as invalid file format
 *       500:
 *         description: Error submitting application
 */
router.post('/apply', upload.single('cv'), submitApplication);  // Add `upload.single` middleware to handle file uploads

module.exports = router;
