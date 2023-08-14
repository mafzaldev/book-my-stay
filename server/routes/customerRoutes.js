const router = require("express").Router();
const mongoose = require("mongoose");
const Room = require("../models/room");
const Reservation = require("../models/reservation");
const TempReservation = require("../models/tempReservation");
const Employee = require("../models/employee");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { Resend } = require("resend");
const resend = new Resend(process.env.SENDGRID_API_KEY);

const { checkout } = require("../lib");

router.get("/rooms", async (req, res) => {
  const { roomType } = req.body;
  const roomTypeTemp = roomType ? roomType : "all";

  try {
    if (roomTypeTemp === "all") {
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
    } else {
      await Room.find({ roomType: roomTypeTemp, booked: false }).then(
        async (rooms) => {
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
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching rooms." });
  }
});

router.get("/room/:roomNo", async (req, res) => {});

router.post("/room/book", async (req, res) => {
  const {
    roomNo,
    days,
    customerEmail,
    customerPhone,
    numberOfChildren,
    numberOfAdults,
  } = req.body;

  if (
    !roomNo ||
    !days ||
    !customerPhone ||
    !customerEmail ||
    !numberOfChildren ||
    !numberOfAdults
  )
    return res.status(422).json({ message: "Required fields are not filled." });

  try {
    await Room.findOne({ roomNo: roomNo }).then((room) => {
      if (room.booked === true) {
        return res.status(422).json({ message: "Room is already booked." });
      } else {
        const tempReservation = new TempReservation({
          roomNo,
          customerPhone,
          days,
          price: room.pricePerDay,
          checkIn: new Date().toLocaleDateString(),
          customerEmail,
          numberOfChildren,
          numberOfAdults,
        });
        tempReservation.save();

        roomPaymentDetails = {
          roomNo: roomNo,
          quantity: days,
          price: room.pricePerDay,
          description: room.roomDescription,
          image: room.roomImage,
        };

        checkout(roomPaymentDetails)
          .then((url) => res.json({ url }))
          .catch(async (error) => {
            await TempReservation.findOneAndDelete({
              _id: tempReservation._id,
            }).then(() => {
              res
                .status(500)
                .json({ message: "Error occurred while booking." });
            });
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while booking room." });
  }
});

router.post("/bookings", async (req, res) => {
  const { email } = req.body;
  try {
    const reservations = await Reservation.find({ customerEmail: email });
    res.status(200).json({ message: "Success", data: reservations });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching reservations." });
  }
});

router.post("/room/checkout", async (req, res) => {
  const { reservationId, rating } = req.body;

  if (!reservationId || !rating)
    return res.status(422).json({ message: "Required fields are not filled." });
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Reservation.findOne({ _id: reservationId }).then(
      async (reservation) => {
        await Room.findOne({ roomNo: reservation.roomNo }).then(
          async (room) => {
            if (room.booked === false) {
              return res.status(422).json({ message: "Room is not booked." });
            } else {
              reservation.rating = rating;
              reservation.checkOut = new Date().toLocaleDateString();
              reservation.save();
              room.booked = false;
              room.save();
              res.status(200).json({ message: "Room rated successfully" });
              await session.commitTransaction();
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    await session.commitTransaction();
    res
      .status(500)
      .json({ message: "Error occurred while checking out room." });
  }
  session.endSession();
});

router.get("/payment/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;

  const tempReservations = await TempReservation.find();
  await TempReservation.findOneAndDelete({ _id: tempReservations[0]._id });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status === "unpaid") {
    return res.redirect(`${process.env.CLIENT_URL}/rooms`);
  }

  const reservation = new Reservation({
    roomNo: tempReservations[0].roomNo,
    price: tempReservations[0].price,
    days: tempReservations[0].days,
    checkIn: tempReservations[0].checkIn,
    customerPhone: tempReservations[0].customerPhone,
    customerEmail: tempReservations[0].customerEmail,
    numberOfChildren: tempReservations[0].numberOfChildren,
    numberOfAdults: tempReservations[0].numberOfAdults,
  });

  reservation.save();
  await Room.findOne({ roomNo: tempReservations[0].roomNo }).then((room) => {
    room.booked = true;
    room.save();
  });
  return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});

router.post("/contact", async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const data = await resend.emails.send({
      from: "customer@resend.dev",
      to: "mafzaldev@gmail.com",
      subject: subject,
      html: `<span><strong>Email from:</strong> ${email}</span><br/> <span><strong>Message:</strong> ${message}</span>`,
    });

    if (!data.id)
      return res
        .status(500)
        .json({ message: "Error occurred while sending email." });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while sending email." });
  }
});

module.exports = router;
