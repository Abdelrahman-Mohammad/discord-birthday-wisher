# Setting Up

First things first, we include the module into the project.

```js
const Birthdays = require("discord-birthday-wisher");
```

After that, you need to provide a valid mongo database url, and set it. You can do so by:

```js
Birthdays.connectionURL("mongodb://..."); // You only need to do this ONCE per process.
```

_Examples assume that you have setted up the module as presented in 'Setting Up' section._
_Following examples assume that your `Discord.Client` is called `client`._

_Following examples assume that your `client.on("messageCreate", message` is called `message`._

_Following example contains isolated code which you need to integrate in your own command handler._

_Following example assumes that you are able to write asynchronous code (use `await`)._

# Examples

Examples:

- [Allocating Random XP For Each Message Sent](https://github.com/MrAugu/discord-xp/blob/master/test/README.md#allocating-random-xp-for-each-message-sent)
- [Rank Command](https://github.com/MrAugu/discord-xp/blob/master/test/README.md#rank-command)
- [Leaderboard Command](https://github.com/MrAugu/discord-xp/blob/master/test/README.md#leaderboard-command)
- [Position of a user in the leaderboard](https://github.com/MrAugu/discord-xp/blob/master/test/README.md#position-of-a-user-in-the-leaderboard)
- [Canvacord Integration](https://github.com/MrAugu/discord-xp/blob/master/test/README.md#canvacord-integration)

---

## Allocating Random XP For Each Message Sent

```js
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Birthdays.appendXp(
    message.author.id,
    message.guild.id,
    randomAmountOfXp
  );
  if (hasLeveledUp) {
    const user = await Birthdays.fetch(message.author.id, message.guild.id);
    message.channel.send({
      content: `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`,
    });
  }
});
```

## Rank Command

```js
const target = message.mentions.users.first() || message.author; // Grab the target.

const user = await Birthdays.fetch(target.id, message.guild.id); // Selects the target from the database.

if (!user)
  return message.channel.send(
    "Seems like this user has not earned any xp so far."
  ); // If there isnt such user in the database, we send a message in general.

message.channel.send(`> **${target.tag}** is currently level ${user.level}.`); // We show the level.
```

## Leaderboard Command

```js
const rawLeaderboard = await Birthdays.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

const leaderboard = await Birthdays.computeLeaderboard(
  client,
  rawLeaderboard,
  true
); // We process the leaderboard.

const lb = leaderboard.map(
  (e) =>
    `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
      e.level
    }\nXP: ${e.xp.toLocaleString()}`
); // We map the outputs.

message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
```

## Position of a user in the leaderboard

```js
const target = message.mentions.users.first() || message.author; // Grab the target.

const user = await Birthdays.fetch(target.id, message.guild.id, true); // Selects the target from the database.

console.log(user.position);
```

## Canvacord Integration

Obviously you need the npm package `canvacord` for that. Install it with `npm install canvacord`.

```js
const canvacord = require("canvacord");

const target = message.mentions.users.first() || message.author; // Grab the target.

const user = await Birthdays.fetch(target.id, message.guild.id, true); // Selects the target from the database.

const rank = new canvacord.Rank() // Build the Rank Card
  .setAvatar(target.displayAvatarURL({ format: "png", size: 512 }))
  .setCurrentXP(user.xp) // Current User Xp
  .setRequiredXP(Birthdays.xpFor(user.level + 1)) // We calculate the required Xp for the next level
  .setRank(user.position) // Position of the user on the leaderboard
  .setLevel(user.level) // Current Level of the user
  .setProgressBar("#FFFFFF")
  .setUsername(target.username)
  .setDiscriminator(target.discriminator);

rank.build().then((data) => {
  const attachment = new Discord.MessageAttachment(data, "RankCard.png");
  message.channel.send(attachment);
});
```

While this previous example works **perfectly** fine a lot of people asked how they could only get the required xp needed for the next level and the actual xp progress in the current level.

```js

<user>.cleanXp // Gets the current xp in the current level
<user>.cleanNextLevelXp // Gets the actual xp needed to reach the next level

```

Resulting code:

```js
const canvacord = require("canvacord");

const target = message.mentions.users.first() || message.author; // Grab the target.

const user = await Birthdays.fetch(target.id, message.guild.id, true); // Selects the target from the database.

const rank = new canvacord.Rank() // Build the Rank Card
  .setAvatar(target.displayAvatarURL({ format: "png", size: 512 }))
  .setCurrentXP(user.cleanXp) // Current User Xp for the current level
  .setRequiredXP(user.cleanNextLevelXp) //The required Xp for the next level
  .setRank(user.position) // Position of the user on the leaderboard
  .setLevel(user.level) // Current Level of the user
  .setProgressBar("#FFFFFF")
  .setUsername(target.username)
  .setDiscriminator(target.discriminator);

rank.build().then((data) => {
  const attachment = new Discord.MessageAttachment(data, "RankCard.png");
  message.channel.send(attachment);
});
```

_It's time for you to get creative.._
