const Item = require('../models/clothingItems');
const { sendErrorStatus } = require('../utils/errors');

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
