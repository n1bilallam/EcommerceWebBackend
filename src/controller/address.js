const UserAddress = require("../models/address");

exports.addAddress = (req, res) => {
  const { payload } = req.body;
  if (payload.address) {
    UserAddress.findByIdAndUpdate(
      { user: req.user._id },
      {
        $push: {
          address: payload.address,
        },
      },
      { new: true, upsert: true }
    ).exec((error, address) => {
      if (error) return res.status(400).json({ error });
      if (address) {
        res.status(201).json({ address });
      }
    });
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) return res.status(200).json({ address });
  });
};