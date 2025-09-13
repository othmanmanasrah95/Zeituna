const mongoose = require('mongoose');

// Connect to MongoDB Atlas (use your actual Atlas connection string)
const connectDB = async () => {
  try {
    // Replace this with your actual MongoDB Atlas connection string
    const mongoUri = 'mongodb+srv://Zeituna:Zeituna2025@cluster0.hiwwgxf.mongodb.net/zeituna?retryWrites=true&w=majority&appName=Cluster0';
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const addOliveOilVariant = async () => {
  try {
    await connectDB();
    
    // Import models after database connection is established
    const Product = require('../models/product');
    const User = require('../models/user');

    // Find an admin user to be the seller
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      // If no admin exists, create one
      console.log('No admin user found. Creating admin user...');
      adminUser = new User({
        name: 'System Admin',
        email: 'admin@zeituna.com',
        password: 'admin123456', // This will be hashed by the pre-save middleware
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created successfully');
    }

    // Check if the 750ml olive oil variant already exists
    const existingProduct = await Product.findOne({ 
      name: 'Premium Olive Oil 750ml',
      tutPrice: 22 
    });

    if (existingProduct) {
      console.log('750ml olive oil variant already exists:', existingProduct._id);
      console.log('Product ID to use in frontend:', existingProduct._id.toString());
      return existingProduct._id.toString();
    }

    // Create the 750ml olive oil variant
    const oliveOilVariant = new Product({
      name: 'Premium Olive Oil 750ml',
      description: 'Premium cold-pressed extra virgin olive oil from Palestinian groves. Perfect size for daily use and gifting. Redeemable with 22 TUT tokens earned from tree adoption.',
      price: 0, // Free when using TUT tokens
      tutPrice: 22, // Costs 22 TUT tokens
      unit: '750ml',
      stockQuantity: 1000,
      images: ['/public/oil.png'], // Using existing oil image
      category: 'olive_oil',
      seller: adminUser._id,
      rewardTUTPercent: 0, // No additional TUT reward for this product
      tutRewardFixed: 0,
      inStock: true,
      featured: true, // Feature this product
      features: [
        'Cold-pressed extra virgin olive oil',
        'Premium Palestinian quality',
        'Perfect for daily cooking',
        'Eco-friendly packaging',
        'Redeemable with TUT tokens'
      ],
      specifications: {
        'Volume': '750ml',
        'Type': 'Extra Virgin Olive Oil',
        'Origin': 'Palestinian Groves',
        'Processing': 'Cold-pressed',
        'Packaging': 'Eco-friendly glass bottle'
      },
      shipping: {
        free: true,
        estimatedDays: '3-5 business days'
      },
      sustainability: {
        carbonNeutral: true,
        locallySourced: true,
        plasticFree: true
      }
    });

    await oliveOilVariant.save();
    console.log('750ml olive oil variant created successfully:', oliveOilVariant._id);
    console.log('Product details:');
    console.log('- Name:', oliveOilVariant.name);
    console.log('- TUT Price:', oliveOilVariant.tutPrice);
    console.log('- Category:', oliveOilVariant.category);
    console.log('- Featured:', oliveOilVariant.featured);
    console.log('Product ID to use in frontend:', oliveOilVariant._id.toString());
    
    return oliveOilVariant._id.toString();

  } catch (error) {
    console.error('Error adding olive oil variant:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
addOliveOilVariant();
