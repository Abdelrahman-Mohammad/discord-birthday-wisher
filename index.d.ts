// Type definitions for discord-birthday-wisher v1.0
// Project: https://github.com/Abdelrahman-Mohammad/discord-birthday-wisher
// Definitions by: Abdelrahman Mohammad <https://github.com/Abdelrahman-Mohammad/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type Birthday = {
    userID: string;
    guildID: string;
    birthdayDay: number;
    birthdayMonth: number;
    birthdayYear: number;
  };


declare module "discord-birthday-wisher" {
    export default class DiscordBirthdayWisher {
        static async setURL(dbURL: string): Promise<typeof import("mongoose")>;
        static async setBirthday(userId: string, guildId: string, birthdayDay: number, birthdayMonth: number, birthdayYear: number): Promise<Birthday>;
        static async deleteBirthday(userId: string, guildId: string): Promise<Birthday>;
        static async changeBirthday(userId: string, guildId: string, birthdayDay: number,birthdayMonth: number, birthdayYear: number): Promise<Birthday>;
        
      }
}