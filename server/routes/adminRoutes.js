const Employee = require("../models/employee");

const router = require("express").Router();

router.get("/employee/create", async (req, res) => {
  const { name, image, cnic, phone, email, salary } = req.body;

  if (!name || !image || !cnic || !phone || !email || !salary)
    return res.status(422).json({ message: "Required fields are not filled." });

  Employee.findOne({ email: email }).then((employee) => {
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
  });

  try {
    await employee.save().then(() => {
      res.status(200).json({ message: "Employee created successfully." });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
