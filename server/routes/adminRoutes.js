const router = require("express").Router();
const multer = require("../config/multer");
const cloudinary = require("../config/cloudinary");

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

router.get("/availableEmployees", async (req, res) => {
  try {
    const employees = await Employee.find({
      status: "available",
      role: "Servant",
    });
    let employeesTemp = [];
    employees.forEach((employee) => {
      employeesTemp.push({
        id: employee._id,
        name: employee.name,
      });
    });
    res.status(200).json({ message: "Success", data: employeesTemp });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching employees." });
  }
});

router.post("/employee/create", multer.single("image"), async (req, res) => {
  const { name, cnic, phone, email, role, salary, status } = req.body;

  const upload = await cloudinary.v2.uploader
    .upload(req.file.path)
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error occurred while uploading image." });
    });

  if (!name || !upload || !cnic || !phone || !email || !salary || !status)
    return res.status(422).json({ message: "Required fields are not filled." });

  await Employee.findOne({ email: email }).then((employee) => {
    if (employee)
      return res.status(422).json({ message: "Employee already exists." });
  });

  const employee = new Employee({
    name,
    image: upload.secure_url,
    cnic,
    phone,
    email,
    role,
    salary,
    status,
  });

  try {
    await employee.save().then(() => {
      res.status(200).json({ message: "Employee created successfully." });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred while adding employee." });
  }
});

router.delete("/employee/delete/:id", async (req, res) => {
  const employeeId = req.params.id;

  if (!employeeId)
    return res.status(422).json({ message: "Required fields are not filled." });

  try {
    await Employee.findOneAndDelete({ _id: employeeId }).then(() => {
      res.status(200).json({ message: "Employee deleted successfully." });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while uploading image." });
  }
});

/* Rooms Routes */
router.get("/rooms", async (req, res) => {
  try {
    await Room.find({ booked: false }).then(async (rooms) => {
      const roomsTemp = await Promise.all(
        rooms.map(async (room) => {
          const employee = await Employee.findOne({ _id: room.servantId });
          if (employee) {
            room.servantId = employee.name;
            return room;
          }
        })
      );
      res.status(200).json({ message: "Success", data: roomsTemp });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching rooms." });
  }
});

router.post("/room/create", multer.single("roomImage"), async (req, res) => {
  const { roomNo, roomType, servantId, pricePerDay, roomDescription } =
    req.body;

  const upload = await cloudinary.v2.uploader
    .upload(req.file.path)
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error occurred while uploading image." });
    });

  if (
    !roomNo ||
    !roomType ||
    !servantId ||
    !pricePerDay ||
    !upload ||
    !roomDescription
  )
    return res.status(422).json({ message: "Required fields are not filled." });

  const room = new Room({
    roomNo,
    roomType,
    servantId,
    pricePerDay,
    roomImage: upload.secure_url,
    roomDescription,
  });

  try {
    await room.save().then(async () => {
      await Employee.findOneAndUpdate(
        { _id: servantId },
        { status: "unavailable" }
      );
      res.status(200).json({ message: "Room added successfully." });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while adding room." });
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
