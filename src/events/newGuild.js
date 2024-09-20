//This event creates a new channel called gallery if it does not exist, called when a new guild is added.

//Functional - 9/19/2024 

const { Events, ChannelType } = require("discord.js");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    const defaultChannelName = "Gallery"; //TODO - Make this customizable

    try {
      const channel = guild.channels.cache.find((c) => {
        c.name === defaultChannelName;
      });

      if (!channel) {
        guild.channels.create({ name: defaultChannelName, type: ChannelType.GuildText, reason: "Default"});
        console.log(`New Channel Made: ${defaultChannelName}.`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
