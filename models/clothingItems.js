const mongoose = require('mongoose');
const validator = require('validator');

const clothingItemsSchema = new mongoose.Schema({
  name: {
    type: String,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [],
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  }
})

module.exports = mongoose.model('clothingItem', clothingItemsSchema);

