const mongoose = require("mongoose");

const BirthdaySchema = new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  BirthdayDay: { type: Number },
  BirthdayMonth: { type: Number },
  BirthdayYear: { type: Number },
  lastUpdated: { type: Date, default: new Date() },
});

const birthdays = mongoose.model("Birthdays", BirthdaySchema);

module.exports = birthdays;
