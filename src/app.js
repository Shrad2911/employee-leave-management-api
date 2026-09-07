const express = require('express');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Body Parser Middleware
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/leaves', leaveRoutes);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Employee Leave Management API is running.' });
});

// Centralized Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;