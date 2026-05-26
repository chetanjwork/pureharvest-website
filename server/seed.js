const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PortfolioItem = require('./models/PortfolioItem');

dotenv.config();

const items = [
  {
    title: 'The Obsidian Collection',
    clientName: 'Grand Hyatt',
    category: 'Luxury Hospitality',
    imageUrl: '/bottle-hotel.webp',
    featured: true
  },
  {
    title: 'Modernist Series',
    clientName: 'Brew & Co.',
    category: 'Bespoke Café',
    imageUrl: '/bottle-cafe.webp',
    featured: true
  },
  {
    title: 'Crystal Heirloom',
    clientName: 'Private Estate',
    category: 'Premium Wedding',
    imageUrl: '/bottle-wedding.webp',
    featured: true
  },
  {
    title: 'Azure Limited',
    clientName: 'TechCorp',
    category: 'Custom Branding',
    imageUrl: '/bottle-cafe.webp',
    featured: false
  },
  {
    title: 'Crystal Series',
    clientName: 'Skyline Hotels',
    category: 'Bulk Supply',
    imageUrl: '/bottle-hotel.webp',
    featured: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pureharvest');
    console.log('Connected to DB for seeding...');
    
    await PortfolioItem.deleteMany();
    console.log('Cleared existing portfolio items.');
    
    await PortfolioItem.insertMany(items);
    console.log('Successfully seeded portfolio items.');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
