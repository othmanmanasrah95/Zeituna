require('dotenv').config();
const mongoose = require('mongoose');
const { generateToken } = require('./utils/tokenUtils');
const TokenBalance = require('./models/tokenBalance');

// Set environment variables for testing
process.env.JWT_SECRET = 'test-secret-key-for-development';
process.env.MONGO_URI = 'mongodb://localhost:27017/zeituna';

console.log('Environment variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);

// Test token generation
console.log('Testing token generation...');
try {
  const testUserId = new mongoose.Types.ObjectId();
  const token = generateToken(testUserId);
  console.log('✅ Token generation works:', token ? 'SUCCESS' : 'FAILED');
} catch (error) {
  console.log('❌ Token generation failed:', error.message);
}

// Test TokenBalance model
console.log('\nTesting TokenBalance model...');
try {
  const testTokenBalance = new TokenBalance({
    user: new mongoose.Types.ObjectId(),
    balance: 100,
    transactions: [
      {
        type: 'reward',
        amount: 100,
        description: 'Test reward'
      }
    ]
  });
  console.log('✅ TokenBalance model works:', testTokenBalance ? 'SUCCESS' : 'FAILED');
} catch (error) {
  console.log('❌ TokenBalance model failed:', error.message);
}

console.log('\n🎉 Basic tests completed!'); 