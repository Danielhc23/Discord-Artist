const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const env = require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { registerCommands } = require('./deploy-commands.js');
const token = process.env.DISCORD_TOKEN;

//Get Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildIntegrations
  ],
});

client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Register slash commands
  try {
    await registerCommands(); 
    console.log('Commands registered successfully.');
  } catch (error) {
    console.error(error);
  }

});

client.commands = new Collection(); //Make map of commands

//Get all commands
const commandsPath = path.join(__dirname, "commands");
const commandFolder = fs.readdirSync(commandsPath);

for (const folder of commandFolder) {
  const folderPath = path.join(commandsPath, folder);
  const commands = fs.readdirSync(folderPath).filter((f) => f.endsWith(".js"));
  for (const file of commands) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);

    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

//Get all events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
