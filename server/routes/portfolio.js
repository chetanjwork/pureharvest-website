const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');

// @route   GET /api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await PortfolioItem.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   POST /api/portfolio
// @desc    Create a portfolio item
// @access  Private (In a real app, this would be protected)
router.post('/', async (req, res) => {
  try {
    const item = await PortfolioItem.create(req.body);
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
