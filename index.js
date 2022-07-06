const mongoose = require("mongoose");
const birthdays = require("./models/birthdays.js");
var mongoUrl;

class DiscordBirthdayWisher {
  /**
   * @param {string} [dbUrl] - A valid mongo database URI.
   */

  static async setURL(dbUrl) {
    if (!dbUrl) throw new TypeError("A database url was not provided.");
    mongoUrl = dbUrl;
    return mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [birthdayDay] - The day of the birthday.
   * @param {number} [birthdayMonth] - The month of the birthday.
   * @param {number} [birthdayYear] - The year of the birthday.
   */

  static async setBirthday(
    userId,
    guildId,
    birthdayDay,
    birthdayMonth,
    birthdayYear
  ) {
    const currentYear = new Date().getFullYear();
    if (!userId) throw new TypeError("A user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!birthdayDay) throw new TypeError("A birthday day was not provided.");
    if (!birthdayMonth)
      throw new TypeError("A birthday month was not provided.");
    if (!birthdayYear) throw new TypeError("A birthday year was not provided.");
    if (birthdayDay > 31)
      throw new TypeError("A birthday day can't be over 31.");
    if (birthdayMonth > 12)
      throw new TypeError("A birthday month can't be over 12.");
    if (birthdayYear > currentYear)
      throw new TypeError(`A birthday year can't be over ${currentYear}`);

    const isBirthday = await birthdays.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (isBirthday) return false;

    const newBirthday = new birthdays({
      userID: userId,
      guildID: guildId,
      BirthdayDay: birthdayDay,
      BirthdayMonth: birthdayMonth,
      BirthdayYear: birthdayYear,
    });

    await newBirthday
      .save()
      .catch((e) => console.log(`Failed to set birthday: ${e}`));

    return newBirthday;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   */

  static async deleteBirthday(userId, guildId) {
    if (!userId) throw new TypeError("A user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");

    const birthday = await birthdays.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!birthday) return false;

    await birthdays
      .findOneAndDelete({ userID: userId, guildID: guildId })
      .catch((e) => console.log(`Failed to delete birthday: ${e}`));

    return birthday;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [birthdayDay] - The day of the birthday.
   * @param {number} [birthdayMonth] - The month of the birthday.
   * @param {number} [birthdayYear] - The year of the birthday.
   */

  static async changeBirthday(
    userId,
    guildId,
    birthdayDay,
    birthdayMonth,
    birthdayYear
  ) {
    const currentYear = new Date().getFullYear();
    if (!userId) throw new TypeError("A user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!birthdayDay) throw new TypeError("A birthday day was not provided.");
    if (!birthdayMonth)
      throw new TypeError("A birthday month was not provided.");
    if (!birthdayYear) throw new TypeError("A birthday year was not provided.");
    if (birthdayDay > 31)
      throw new TypeError("A birthday day can't be over 31.");
    if (birthdayMonth > 12)
      throw new TypeError("A birthday month can't be over 12.");
    if (birthdayYear > currentYear)
      throw new TypeError(`A birthday year can't be over ${currentYear}`);

    const birthday = await birthdays.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!birthday) return false;

    const newBirthday = await birthdays.findByIdAndUpdate(
      {
        userID: userId,
        guildID: guildId,
      },
      {
        BirthdayDay: birthdayDay,
        BirthdayMonth: birthdayMonth,
        BirthdayYear: birthdayYear,
      }
    );

    return newBirthday;
  }
}

module.exports = DiscordBirthdayWisher;
