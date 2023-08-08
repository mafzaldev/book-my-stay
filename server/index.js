const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(
      "mongodb+srv://mafzaldev:FhQLd11y6h6hmjZ6@default.em4p108.mongodb.net/BookMyStay?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Database connected");
    });
  console.log(`Server is running on port ${PORT}`);
});
