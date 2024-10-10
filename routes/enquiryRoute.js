const express = require('express');
const router = express.Router();
const { sendEnquiry } = require("../controllers/enquiryController");

/**
 * @swagger
 * /api/enquiries:
 *   post:
 *     summary: Contacting customer care to schedule an appointment
 *     tags:
 *       - Contacting customer care
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               subject:
 *                 type: string
 *                 example: General Inquiry
 *               comments:
 *                 type: string
 *                 example: I would like to know more about your services.
 *     responses:
 *       201:
 *         description: Enquiry submitted successfully
 *       500:
 *         description: Error submitting enquiry
 */
router.post('/enquiries', sendEnquiry);

module.exports = router;
