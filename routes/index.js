const express = require("express");
const router = express.Router();

const usersRouter = require("./routes/users");

const index_controller = require("../controllers/indexController");

app.use("/users", usersRouter);

/* GET home page. */
router.get("/", index_controller.index);

module.exports = router;
