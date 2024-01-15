const Item = require('../models/clothingItems');
const { isValidId } = require('../utils/errors');

module.exports.getItems = (req, res) => {
  Item.find({})
    .populate()
    .then(item => res.send({ data: item }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
  .populate('user')
  .then(item => {
    res.send({ data: item });
    console.log(req.user._id);
  })
  .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteItem = (req, res) => {
  const { _id } = req.params;

  if(!isValidId(_id)){
    return res.status(400).send({ message: "Invalid object id" });
  }

  Item.deleteOne({_id: _id})
  .orFail()
  .then(item => {
    console.log(item);
    res.send({ data: item });
  })
  .catch(err => res.status(404).send({ message: err.message }));
};
