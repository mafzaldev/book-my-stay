const mongoose = require("mongoose");

const tempReservationSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
    default: "1970-01-01",
  },
  numberOfChildren: {
    type: Number,
    default: 0,
  },
  numberOfAdults: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("TempReservation", tempReservationSchema);
