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
  phone: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
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
