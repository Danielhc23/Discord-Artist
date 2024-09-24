//This event creates a new channel called gallery if it does not exist, called when a new guild is added.

//Functional - 9/19/2024 

/**
 * CHANGES -
 * 9/19/2024 - V2.0 - Added consoloe.log to indicate the beginning of creating the channel.
 */

const { Events, ChannelType } = require("discord.js");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    const defaultChannelName = "Gallery"; //TODO - Make this customizable
    try {
      const channel = guild.channels.cache.find((c) => {
        c.name === defaultChannelName;
      });

      console.log(`Creating Channel: ${defaultChannelName}.`);

      if (!channel) {
        guild.channels.create({ name: defaultChannelName, type: ChannelType.GuildText, reason: "Default"});
        console.log(`New Channel Made: ${defaultChannelName}.`);
      }
      else {
        console.error(`Channel ${defaultChannelName} could not be made.`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
