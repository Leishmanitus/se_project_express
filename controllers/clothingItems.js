const Item = require('../models/clothingItems');
const { sendErrorStatus, checkUserId } = require('../utils/errors');

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
  .then(item => {
    res.send({ data: item });
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status || 500).send({ message:error.message || err.message });
  });
};

module.exports.getItems = (req, res) => {
  Item.find({})
    .then(items => {
      res.send({ data: items });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};

module.exports.deleteItem = (req, res) => {
  const { _id } = req.params;

  Item.findByIdAndDelete({ _id })
  .orFail()
  .then(item => {
    checkUserId(_id, Item.user._id);
    res.send({ data: item });
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status || 500).send({ message:error.message || err.message });
  });
};

module.exports.likeItem = (req, res) => {
  const { _id } = req.params;
  console.log(req.params);

  Item.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(like => {
      res.status(200).send({ data: like });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};

module.exports.dislikeItem = (req, res) => {
  const { _id } = req.params;

  Item.findByIdAndUpdate(
    _id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(like => {
      res.status(200).send({ data: like });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};
