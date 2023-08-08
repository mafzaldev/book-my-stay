const router = require("express").Router();
const Customer = require("../models/customer");
const { adminName, adminEmail, adminPassword } = require("../lib");

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
      res.status(200).json({ message: "Signed up successfully." });
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

  const isAdminEmail = email.split("@")[1] === "bookmystay.com" ? true : false;
  const isAdmin =
    isAdminEmail && email === adminEmail && password === adminPassword;
  if (isAdmin) {
    return res.status(200).json({
      message: "Success",
      data: {
        name: adminName,
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
