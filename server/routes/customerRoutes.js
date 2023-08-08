const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello from customerRoutes.js");
});

module.exports = router;
