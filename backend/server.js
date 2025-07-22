require('dotenv').config();

// Set environment variables for testing if not already set
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = 'mongodb://localhost:27017/zeituna';
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test-secret-key-for-development';
}

const app = require('./app');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
