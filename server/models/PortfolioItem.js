const mongoose = require('mongoose');

const PortfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  clientName: {
    type: String,
    required: [true, 'Please add a client name']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Custom Branding', 'Bulk Supply', 'Premium Solutions', 'Events']
  },
  description: String,
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
