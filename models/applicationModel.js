const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Work experience sub-schema
const workExperienceSchema = new Schema({
  position: { type: String, required: true }, // Change `title` to `position`
  companyName: { type: String, required: true } // Change `company` to `companyName`
}, { _id: false }); // _id: false to avoid creating an _id for each work experience entry

const applicationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interestedPosition: { type: String, required: true },
  coverLetter: { type: String, required: true },

  // Store the file path (string) pointing to the CV document
  cv: { type: String, required: true },

  // Array of work experience subdocuments
  workExperience: {
    type: [workExperienceSchema],  // Use the workExperienceSchema defined above
    required: true,
    validate: {
      validator: function (value) {
        // Ensure it's an array and each item has both position and companyName
        return Array.isArray(value) && value.length > 0 && value.every(item => item.position && item.companyName);
      },
      message: 'Each work experience entry must contain a position and a company name.'
    }
  }
}, {
  timestamps: true // Enable `createdAt` and `updatedAt` timestamps
});

module.exports = mongoose.model('Application', applicationSchema);
