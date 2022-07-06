<p align="center"><a href="https://nodei.co/npm/discord-birthday-wisher/"><img src="https://nodei.co/npm/discord-birthday-wisher.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-birthday-wisher"> <img src="https://img.shields.io/github/repo-size/Abdelrahman-Mohammad/discord-birthday-wisher"> <img src="https://img.shields.io/npm/l/discord-birthday-wisher"> <img src="https://img.shields.io/github/contributors/Abdelrahman-Mohammad/discord-birthday-wisher"> <img src="https://img.shields.io/github/package-json/dependency-version/Abdelrahman-Mohammad/discord-birthday-wisher/mongoose"><a href="https://discord.gg/rk7cVyk"><img src="https://discordapp.com/api/guilds/753938142246994031/widget.png" alt="Discord server"/></a></p>

# discord-birthday-wisher
- discord-brithday-wisher is a powerful npm package that wishes everyone a happy birthday on their birthday, uses MongoDB.
- If you need help feel free to join our <a href="https://discord.gg/hnzXhDh">discord server</a> to talk and help you with your code.
- If you encounter any of those fell free to open an issue in our <a href="https://github.com/Abdelrahman-Mohammad/discord-birthday-wisher/issues">github repository</a>.

# Download & Update
You can download it from npm:
```cli
npm i discord-brithday-wisher
```
You can update to a newer version to receive updates using npm.
```cli
npm update discord-brithday-wisher
```

# Changelog
- **6 July 2022** (v1.1.0) - Grand Launch.
```js
/* setBirthday Example */
const Birthdays = require("discord-brithday-wisher");
// Sets the birthday for a user to 06/07/2022.
var myBirthday = Birthdays.setBirthday("611107142560382976","753938142246994031", "8", "11", "2005");

console.log(myBirthday); // Output: 8/11/2005
```

# Setting Up
First things first, we include the module into the project.
```js
const Birthdays = require("discord-brithday-wisher");
```
After that, you need to provide a valid mongo database url, and set it. You can do so by:
```js
Birthdays.setURL("mongodb://..."); // You only need to do this ONCE per process.
```

# Examples
*Examples can be found in /test*

# Methods
**setBirthday**

Creates an entry in database for that birthday if it doesnt exist.
```js
Birthdays.setBirthday(<UserID - String>, <GuildID - String>, <BirthdayDay - Number> , BirthdayMonth - Number>, <BirthdayYear - Number>);
```
- Output:
```
Promise<Object>
```
**deleteBirthday**

If the birthday exists, deletes it from the database.
```js
Birthdays.deleteBirthday(<UserID - String>, <GuildID - String>);
```
- Output:
```
Promise<Object>
```
**changeBirthday**

If the birthday exists, changes it from the database.
```js
Birthdays.changeBirthday(<UserID - String>, <GuildID - String>, <BirthdayDay - Number> , BirthdayMonth - Number>, <BirthdayYear - Number>);
```
- Output:
```
Promise<Object>
```
