require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
