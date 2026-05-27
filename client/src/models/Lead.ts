import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
    required: false,
  },
  company: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  volume: {
    type: String,
    trim: true,
  },
  customization: {
    type: [String],
    default: [],
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
