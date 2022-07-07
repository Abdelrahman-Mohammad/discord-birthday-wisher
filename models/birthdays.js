const mongoose = require("mongoose");

const BirthdaySchema = new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  Day: { type: Number },
  Month: { type: Number },
  Year: { type: Number },
  Full: { type: String },
  lastUpdated: { type: Date, default: new Date() },
});

const birthdays = mongoose.model("Birthdays", BirthdaySchema);

module.exports = birthdays;
