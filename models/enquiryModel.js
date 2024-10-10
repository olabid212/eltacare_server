const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    comments: { type: String, required: true }

}, {
  timestamps: true // Enable `createdAt` and `updatedAt` timestamps
})

module.exports = mongoose.model('Enquiry', enquirySchema);
