const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
    default: 1,
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

module.exports = mongoose.model("Reservation", reservationSchema);
