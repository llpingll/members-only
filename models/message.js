const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  date: Date,
});

module.exports = mongoose.model("Message", messageSchema);
