const mongoose = require('mongoose');
const validator = require('validator');

const clothingItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  weather: {
    type: String,
    enum: ['hot', 'warm', 'cold'],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Not a valid url",
    }
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  }
});

module.exports = mongoose.model('clothingItem', clothingItemsSchema);
