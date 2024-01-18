const Item = require('../models/clothingItems');
const { sendErrorStatus, isValidId } = require('../utils/errors');

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
  .then(item => {
    res.send({ data: item });
    item.owner = req.user._id;
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status).send({message:err.message});
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
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.getItem = (req, res) => {
  const { _id } = req.params;

  Item.findById({_id})
    .orFail()
    .populate()
    .then(item => {
      isValidId(item._id);
      res.send({ data: item });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.updateItem = (req, res) => {
  const { _id } = req.params;

  Item.findByIdAndUpdate({ _id }, req.body)
    .orFail()
    .then(item => {
      isValidId(item._id);
      res.send({ data: item });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.deleteItem = (req, res) => {
  const { _id } = req.params;

  Item.findByIdAndDelete({ _id })
  .orFail()
  .then(item => {
    isValidId(item._id);
    res.send({ data: item });
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status).send({message:err.message});
  });
};
