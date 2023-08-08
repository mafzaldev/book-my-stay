const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    enum: ["Single", "Double"],
    required: true,
  },
  servantName: {
    type: String,
  },
  servantContact: {
    type: String,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  roomImage: {
    type: String,
  },
  roomDescription: {
    type: String,
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
