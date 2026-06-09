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
  refId: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  orderType: {
    type: String,
  },
  eventDate: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  requestSample: {
    type: Boolean,
    default: false,
  },
  logoUrl: {
    type: String,
  },
  leadSource: {
    type: String,
    default: 'Website Form',
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
