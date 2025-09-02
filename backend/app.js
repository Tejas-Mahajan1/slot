const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
// Firestore initialized in config/firebase.js
require('./config/firebase');

// Firestore initialization is handled in config/firebase

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Root route
app.get('/', (req, res) => {
  res.send('Slot Booking Backend is running');
});

// Routes
app.use('/', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
