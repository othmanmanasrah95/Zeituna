const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');

    // Test registration
    console.log('1. Testing registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const registerResponse = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.data.success);

    // Test login
    console.log('\n2. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data.success);

    // Test with malformed JSON
    console.log('\n3. Testing malformed JSON...');
    try {
      await axios.post(`${API_URL}/auth/login`, 'invalid json string', {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.log('✅ Malformed JSON properly rejected:', error.response?.data?.error);
    }

    console.log('\n🎉 All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI(); 