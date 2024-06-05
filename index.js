const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const placeRoutes = require('./entities/Place');
const eventRoutes = require('./entities/Event');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://prashantdhaked159:5M45JVT6MHCMZQmT@cluster0.hfzynk1.mongodb.net/testdb';
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/places', placeRoutes);
app.use('/events', eventRoutes);

// Database connection and server start
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });

  /*5M45JVT6MHCMZQmT
prashantdhaked159
 
AIzaSyA86HdE9Mgf7tstgSeiZA5prWQ8AbliQr0*/