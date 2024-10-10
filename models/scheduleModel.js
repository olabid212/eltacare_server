const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },  // time can be stored as a string (e.g. "10:00 AM")
  services: { type: String, required: true },  // New field for services
  comments: { type: String, required: false },
}, {
  timestamps: true  // This adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model('Schedule', scheduleSchema);
