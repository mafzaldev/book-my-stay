const router = require("express").Router();
const Room = require("../models/room");
const Reservation = require("../models/reservation");

router.get("/rooms", async (req, res) => {
  const { roomType } = req.body;

  const roomTypeTemp = roomType || "all";

  try {
    if (roomTypeTemp === "all") {
      await Room.find().then((rooms) => {
        res.status(200).json({ message: "Success", data: rooms });
      });
    } else {
      await Room.find({ roomType: roomTypeTemp }).then((rooms) => {
        res.status(200).json({ message: "Success", data: rooms });
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching rooms." });
  }
});

router.get("/room/:roomNo", async (req, res) => {});

router.post("/bookRoom", async (req, res) => {
  const {
    roomNo,
    checkIn,
    checkOut,
    customerEmail,
    phone,
    numberOfChildren,
    numberOfAdults,
  } = req.body;

  if (
    !roomNo ||
    !phone ||
    !checkIn ||
    !checkOut ||
    !customerEmail ||
    !numberOfChildren ||
    !numberOfAdults
  )
    return res.status(422).json({ message: "Required fields are not filled." });

  let checkInDate = new Date(checkIn);
  let checkOutDate = new Date(checkOut);

  const reservation = new Reservation({
    roomNo,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    customerEmail,
    phone,
    numberOfChildren,
    numberOfAdults,
  });

  try {
    await Room.findOne({ roomNo: roomNo }).then((room) => {
      if (room.booked === true) {
        return res.status(422).json({ message: "Room is already booked." });
      } else {
        reservation.save().then(() => {
          res.status(200).json({ message: "Reservation added successfully" });
        });
        room.booked = true;
        room.save();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while booking room." });
  }
});

router.post("/cancelBooking", async (req, res) => {});

router.post("/rate", async (req, res) => {
  const { reservationId, rating } = req.body;

  if (!reservationId || !rating)
    return res.status(422).json({ message: "Required fields are not filled." });

  try {
    await Reservation.findOne({ _id: reservationId }).then(
      async (reservation) => {
        await Room.findOne({ roomNo: reservation.roomNo }).then((room) => {
          if (room.booked === true) {
            return res.status(422).json({ message: "Room is not booked." });
          } else {
            reservation.rating = rating;
            reservation.save();
            room.booked = true;
            room.save();
            res.status(200).json({ message: "Room rated successfully" });
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while rating room." });
  }
});

module.exports = router;
