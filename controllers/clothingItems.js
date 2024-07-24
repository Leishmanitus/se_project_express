const Item = require('../models/clothingItems');
const DocumentNotFoundError = require('../utils/DocumentNotFoundError');
const { checkObjectId, sendErrorStatus } = require('../utils/errors')

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  Item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then(item => res.send({ data: item }))
    .catch(err => sendErrorStatus(err, next));
};

module.exports.getItems = (req, res, next) => {
  Item
    .find({})
    .populate('owner')
    .populate('likes')
    .then(items => res.send({ data: items }))
    .catch(err => sendErrorStatus(err, next));
};

module.exports.deleteItem = (req, res, next) => {
  const { _id } = req.params;

  Item
    .findById({ _id })
    .then(item => {
      if (!item) throw new DocumentNotFoundError("Item does not exist");
      const idError = checkObjectId(item.owner, req.user._id);
      if (idError) return idError;

        return item
          .deleteOne()
          .then(() => res.send({ message: "Item deleted" }));
      })
      .catch(err => sendErrorStatus(err, next));
};

module.exports.likeItem = (req, res, next) => {
  const { _id } = req.params;

  Item
    .findByIdAndUpdate(
      _id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then(like => {
      if (!like) throw new DocumentNotFoundError("Item does not exist");
      return res.send({ data: like });
    })
    .catch(err => sendErrorStatus(err, next));
};

module.exports.dislikeItem = (req, res, next) => {
  const { _id } = req.params;

  Item
    .findByIdAndUpdate(
      _id,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then(like => {
      if (!like) throw new DocumentNotFoundError("Item does not exist");
      return res.send({ data: like });
    })
    .catch(err => sendErrorStatus(err, next));
};
