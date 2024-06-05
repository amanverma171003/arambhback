const express = require('express');
const mongoose = require('mongoose');

// Define the Place schema
const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

// Create the Place model
const Place = mongoose.model('Place', PlaceSchema);

// Create a new router
const router = express.Router();

// Controller functions
const createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define routes
router.post('/', createPlace);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);
router.put('/:id', updatePlace);
router.delete('/:id', deletePlace);

module.exports = router;
