const router = require("express").Router();

const Employee = require("../models/employee");
const Room = require("../models/room");
const Reservation = require("../models/reservation");

/* Employees Routes */

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: "Success", data: employees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching employees." });
  }
});

router.post("/employee/create", async (req, res) => {
  const { name, image, cnic, phone, email, salary, status } = req.body;

  if (!name || !image || !cnic || !phone || !email || !salary || !status)
    return res.status(422).json({ message: "Required fields are not filled." });

  await Employee.findOne({ email: email }).then((employee) => {
    if (employee)
      return res.status(422).json({ message: "Employee already exists." });
  });

  const employee = new Employee({
    name,
    image,
    cnic,
    phone,
    email,
    salary,
    status,
  });

  try {
    await employee.save().then(() => {
      res.status(200).json({ message: "Employee created successfully." });
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/employee/delete", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(422).json({ message: "Required fields are not filled." });

  try {
    await Employee.findOneAndDelete({ email: email }).then(() => {
      res.status(200).json({ message: "Employee deleted successfully." });
    });
  } catch (error) {
    console.log(error);
  }
});

/* Rooms Routes */

router.get("/rooms", async (req, res) => {});

router.post("/room/create", async (req, res) => {
  const {
    roomNo,
    roomType,
    servantName,
    servantContact,
    pricePerDay,
    roomImage,
    roomDescription,
  } = req.body;

  if (
    !roomNo ||
    !roomType ||
    !servantName ||
    !servantContact ||
    !pricePerDay ||
    !roomImage ||
    !roomDescription
  )
    return res.status(422).json({ message: "Required fields are not filled." });

  const room = new Room({
    roomNo,
    roomType,
    servantName,
    servantContact,
    pricePerDay,
    roomImage,
    roomDescription,
  });

  try {
    await room.save().then(() => {
      res.status(200).json({ message: "Room added successfully." });
    });
  } catch (error) {
    console.log(error);
  }
});

/* Dashboard details */

router.get("/dashboard", async (req, res) => {
  let totalRooms = 0;
  let occupiedRooms = 0;
  let availableRooms = 0;
  let totalBookings = 0;
  let totalRevenue = 0;

  try {
    await Room.find().then((rooms) => {
      totalRooms = rooms.length;

      rooms.forEach((room) => {
        if (room.booked === true) occupiedRooms++;
        else availableRooms++;
      });
    });

    await Reservation.find().then((reservations) => {
      totalBookings = reservations.length;

      reservations.forEach((reservation) => {
        totalRevenue += reservation.price;
      });
    });

    res.status(200).json({
      message: "Success",
      data: {
        totalRooms,
        occupiedRooms,
        availableRooms,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching dashboard details." });
  }
});

module.exports = router;
