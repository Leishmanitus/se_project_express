const Item = require('../models/clothingItems');

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
  .then(item => {
    res.send({ data: item });
  })
  .catch(next);
};

module.exports.getItems = (req, res, next) => {
  Item.find({})
    .populate('owner')
    .populate('likes')
    .then(items => {
      res.send({ data: items });
    })
    .catch(next);
};

module.exports.deleteItem = (req, res, next) => {
  const { _id } = req.params;

  Item.findById({ _id })
  .orFail()
  .then(item => {
    const idError = checkObjectId(item.owner, req.user._id);
    if (idError) return idError;

    return item.deleteOne().then(() => res.send({ message: "Item deleted" }));
  })
  .catch((err) => err.name === "CastError" ? next(new BadRequestError()) : next(err));
};

module.exports.likeItem = (req, res, next) => {
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
    .catch((err) => err.name === "CastError" ? next(new BadRequestError()) : next(err));
};

module.exports.dislikeItem = (req, res, next) => {
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
    .catch((err) => err.name === "CastError" ? next(new BadRequestError()) : next(err));
};
