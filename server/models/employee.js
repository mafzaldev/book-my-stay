const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
