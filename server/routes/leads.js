const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Mapping customization IDs to human-readable premium labels
const EXTRAS_MAP = {
  'etching': 'Logo Etching',
  'packaging': 'Customized Box Packaging',
  'safety_seal': 'Safety Seal',
  'cold_logistics': 'Cold Logistics'
};

const getReadableExtras = (customization) => {
  if (!customization || customization.length === 0) return 'None';
  return customization.map(id => EXTRAS_MAP[id] || id).join(', ');
};

// Helper to log a beautiful styled owner notification in console
const logOwnerNotification = (lead) => {
  console.log('\n\x1b[44m\x1b[37m%s\x1b[0m', ' Bespoke Lead Notification Alert ');
  console.log('\x1b[36m%s\x1b[0m', '--------------------------------------------------');
  console.log(`👤 Name:       \x1b[1m${lead.name}\x1b[0m`);
  console.log(`🏢 Brand/Co:   ${lead.company || 'N/A'}`);
  console.log(`📧 Email ID:   ${lead.email || 'N/A'}`);
  console.log(`🟢 WhatsApp:   \x1b[32m${lead.whatsapp || 'N/A'}\x1b[0m`);
  console.log(`🏭 Industry:   ${lead.industry || 'N/A'}`);
  console.log(`📦 Volume:     ${lead.volume || 'N/A'}`);
  console.log(`✨ Extras:     ${getReadableExtras(lead.customization)}`);
  console.log(`📅 Timestamp:  ${new Date(lead.createdAt).toLocaleString('en-IN')}`);
  console.log('\x1b[36m%s\x1b[0m', '--------------------------------------------------\n');
};

// Helper to sync lead to Google Sheets webhook asynchronously
const syncToGoogleSheets = async (lead) => {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️ [Google Sheets] GOOGLE_SCRIPT_URL is not set in environment. Skipping sheet sync.');
    return;
  }

  try {
    const payload = {
      name: lead.name,
      brand: lead.company || '',
      email: lead.email || '',
      whatsapp: lead.whatsapp ? `'${lead.whatsapp}` : '',
      bottleSelection: lead.volume ? `${lead.industry || ''} | ${lead.volume}` : '',
      extrasSelected: getReadableExtras(lead.customization),
      timestamp: lead.createdAt || new Date()
    };

    console.log('\x1b[36m%s\x1b[0m', '📡 [Google Sheets] Syncing lead to Google Sheets...');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('\x1b[32m%s\x1b[0m', '✅ [Google Sheets] Lead successfully synced to Google Sheets!');
    } else {
      console.error('❌ [Google Sheets] Failed to sync. Status:', response.status);
    }
  } catch (error) {
    console.error('❌ [Google Sheets] Sync Error:', error.message);
  }
};

// @route   POST /api/leads
// @desc    Submit a new lead
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, whatsapp, company, industry, volume, customization, message } = req.body;

    let lead;
    const isDbConnected = require('mongoose').connection.readyState === 1;

    if (isDbConnected) {
      // Save directly to MongoDB if online
      lead = await Lead.create({
        name,
        email,
        whatsapp,
        company,
        industry,
        volume,
        customization: customization || [],
        message,
        createdAt: new Date()
      });
    } else {
      // Fallback gracefully so inquiries are NEVER lost when MongoDB is offline
      console.warn('\x1b[33m%s\x1b[0m', '⚠️ [Database] MongoDB is offline. Processing lead in-memory fallback.');
      lead = {
        name,
        email,
        whatsapp,
        company,
        industry,
        volume,
        customization: customization || [],
        message,
        createdAt: new Date()
      };
    }

    // 1. Log visually inside server console for basic tracking
    logOwnerNotification(lead);

    // 2. Sync to Google Sheets asynchronously in background
    syncToGoogleSheets(lead).catch(err => {
      console.error('❌ Google Sheets sync failed:', err);
    });

    res.status(201).json({
      success: true,
      dbSaved: isDbConnected,
      data: lead,
    });
  } catch (error) {
    console.error('❌ Backend lead creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
