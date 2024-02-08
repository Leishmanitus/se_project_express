const Item = require('../models/clothingItems');
const { sendErrorStatus, checkObjectId } = require('../utils/errors');

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
  .then(item => {
    res.send({ data: item });
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status).send({ message:error.message || err.message });
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
      res.status(error.status).send({ message:error.message || err.message });
    });
};

module.exports.deleteItem = (req, res) => {
  const { _id } = req.params;

  Item.findById({ _id })
  .orFail()
  .then(item => {
    const idError = checkObjectId(res, item.owner, req.user._id);
    if (idError) return idError;

    return item.deleteOne().then(() => res.send({ message: "Item deleted" }));
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status).send({ message:error.message || err.message });
  });
};

module.exports.likeItem = (req, res) => {
  const { _id } = req.params;

  Item.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(like => {
      res.send({ data: like });
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
      res.send({ data: like });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};
