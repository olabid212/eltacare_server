const express = require('express');
const router = express.Router();
const { createSchedule } = require("../controllers/scheduleController");

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Schedule an appointment for a specific service
 *     tags:
 *       - Schedule an Appointment for a specific service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 example: New York
 *               state:
 *                 type: string
 *                 example: NY
 *               zip:
 *                 type: string
 *                 example: 10001
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-10-12
 *               time:
 *                 type: string
 *                 example: 10:00 AM
 *               services:
 *                 type: string
 *                 example: emergency  // Include the new services field
 *               comments:
 *                 type: string
 *                 example: Looking forward to our meeting.
 *     responses:
 *       201:
 *         description: Appointment scheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment scheduled successfully
 *                 newSchedule:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     zip:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     time:
 *                       type: string
 *                     services:
 *                       type: string
 *                     comments:
 *                       type: string
 *       500:
 *         description: Error scheduling appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error scheduling appointment
 *                 error:
 *                   type: string
 *                   example: An unexpected error occurred
 */
router.post('/schedule', createSchedule);

module.exports = router;
