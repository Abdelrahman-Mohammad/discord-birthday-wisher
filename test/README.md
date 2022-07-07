# Setting Up

First things first, we include the module into the project.

```js
const Birthdays = require("discord-birthday-wisher");
```

After that, you need to provide a valid mongo database url, and set it. You can do so by:

```js
Birthdays.connectionURL("mongodb://..."); // You only need to do this ONCE per process.
```
See H0ow to connect to MongoDB Atlas [here](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/)

_Examples assume that you have setted up the module as presented in 'Setting Up' section._
_Following examples assume that your `Discord.Client` is called `client`._

_Following examples assume that your `client.on("messageCreate", message` is called `message`._

_Following example contains isolated code which you need to integrate in your own command handler._

_Following example assumes that you are able to write asynchronous code (use `await`)._

# Examples

Examples:

- [Adding a new birthday](https://github.com/Abdelrahman-Mohammad/discord-birthday-wisher/blob/main/test/README.md#adding-a-new-birthday)
- [Removing a brithday](https://github.com/Abdelrahman-Mohammad/discord-birthday-wisher/blob/main/test/README.md#removing-a-brithday)
- [Chaning a birthday](https://github.com/Abdelrahman-Mohammad/discord-birthday-wisher/blob/main/test/README.md#chaning-a-birthday)

---

## Adding a new birthday

```js
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const channelId = message.channel.id; // Current Channel ID
  const myBirthday = Birthdays.setBirthday(userId, guildId, channelId, 8, 11, 2005);
  await message.channel.send(`I will wish you a happy birthday on ${myBirthday.BirthdayDay}/${myBirthday.BirthdayMonth}/${myBirthday.BirthdayYear}`);
});
```
_note: you need to have client defined for this fucntion, and it needs to be named "client"._
  
## Removing a brithday

```js
client.on("messageCreate", async (message) => {
  if (!message.guild) return; // Make sure the message is in a guild
  if (message.author.bot) return; // Make sure the message author is not a bot

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const channelId = message.channel.id; // Current Channel ID
  const myBirthday = Birthdays.deleteBirthday(userId, guildId);
  await message.channel.send(`Successfully deleted birthday.`);
});
```

## Chaning a birthday

```js
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const myBirthday = await Birthdays.changeBirthday(userId, guildId, 8, 11, 2005);
  await message.channel.send(`Birthday changed. I will wish you a happy birthday on ${myBirthday.Full}`);
});
```

Resulting code:

```js
const Birthdays = require("discord-birthday-wisher");
const { Client } = require("discord.js");
const client = new Client({ intents: 32767 });

client.on("ready", async (client) => {
    console.log("Ready!");
})

// Connecting to MongoDB
Birthdays.connectionURL("mongodb://...").then(console.log("connected"));

// Setting Birthday
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const channelId = message.channel.id; // Current Channel ID
  const myBirthday = Birthdays.setBirthday(userId, guildId, channelId, 8, 11, 2005);
  await message.channel.send(`I will wish you a happy birthday on ${myBirthday.Full}`);
});

// Deleting Birthday
client.on("messageCreate", async (message) => {
  if (!message.guild) return; // Make sure the message is in a guild
  if (message.author.bot) return; // Make sure the message author is not a bot

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const channelId = message.channel.id; // Current Channel ID
  const myBirthday = Birthdays.deleteBirthday(userId, guildId);
  await message.channel.send(`Successfully deleted birthday.`);
});

// Changing Birthday
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const userId = message.author.id; // Current User ID
  const guildId = message.guild.id; // Current Guild ID
  const myBirthday = await Birthdays.changeBirthday(userId, guildId, 8, 11, 2005);
  await message.channel.send(`Birthday changed. I will wish you a happy birthday on ${myBirthday.Full}`);
```

_Now it's time for you to get creative and wish everyone a happy birthday.._
