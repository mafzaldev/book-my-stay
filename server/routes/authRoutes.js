const router = require("express").Router();
const Customer = require("../models/customer");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(422).json({ message: "Required fields are not filled." });

  await Customer.findOne({ email: email }).then((customer) => {
    if (customer) {
      return res.status(422).json({ message: "User already exists." });
    }
  });

  const customer = new Customer({
    name,
    email,
    password,
  });

  try {
    await customer.save().then(() => {
      res.status(200).json({ message: "Success" });
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Error occurred while signing up." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ error: "Required fields are not filled." });

  const isAdmin =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;
  if (isAdmin) {
    return res.status(200).json({
      message: "Success",
      data: {
        name: process.env.ADMIN_NAME,
        email: email,
        role: "admin",
      },
    });
  }

  try {
    await Customer.findOne({ email: email }).then((customer) => {
      if (!customer)
        return res.status(404).json({ message: "User not found." });

      if (customer.password !== password)
        return res.status(422).json({ message: "Invalid credentials." });

      res.status(200).json({
        message: "Success",
        data: {
          name: customer.name,
          email: customer.email,
          role: "customer",
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Error occurred while logging in." });
  }
});

module.exports = router;
