const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 100,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: { type: String, required: true, trim: true },
  cityDistrictTown: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  landMark: { type: String },
  addressType: {
    type: String,
    required: true,
    trim: true,
    enum: ["home", "work"],
    required: true,
  },
});

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);
