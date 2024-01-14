const Item = require('../models/clothingItems');

module.exports.getItems = (req, res) => {
  Item.find({})
    .populate('clothingItem')
    .then(item => res.send({ data: item }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
  .then(item => res.send({ data: item }))
  .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.body;

  Item.deleteOne({itemId})
  .then(item => res.send({ data: item }))
  .catch(err => res.status(404).send({ message: err.message }));
};
