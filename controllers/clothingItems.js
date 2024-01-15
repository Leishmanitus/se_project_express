const Item = require('../models/clothingItems');
const { isValidId } = require('../utils/errors');

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
  .then(item => {
    res.send({ data: item });
    item.owner = req.user._id;
  })
  .catch(err => {
    console.error(err);
    res.status(err.statusCode).send({ message: err.message });
  });
};

module.exports.getItems = (req, res) => {
  Item.find({})
    .populate()
    .then(items => {
      res.send({ data: items });
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.getItem = (req, res) => {
  const { _id } = req.params;

  Item.find({_id})
    .populate()
    .then(item => {
      res.send({ data: item });
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.updateItem = (req, res) => {
  const { _id } = req.params;

  Item.updateOne({ _id }, req.body)
    .orFail()
    .then(item => {
      res.send({ data: item });
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.deleteItem = (req, res) => {
  const { _id } = req.params;

  Item.deleteOne({_id: _id})
  .orFail(_id => isValidId(_id))
  .then(item => {
    res.send({ data: item });
  })
  .catch(err => {
    console.error(err);
    res.status(err.statusCode).send({ message: err.message });
  });
};
