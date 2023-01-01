const fs = require("node:fs"); // used to read the commands directory and identify command files
const path = require("node:path"); // constructs paths to access files and directories
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

/*
  Create a Discord Client with intents. 
*/
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// The Collection class extends JS's native Map class.
// It is used to store and retrieve commands for execution
discordClient.commands = new Collection();

// construct a path to the /commands directory
const commandsPath = path.join(__dirname, "commands"); // __dirname returns the directory name of the current module

// fs.readdirSync() reads the contents of a given directory and returns an array of all the file names it contains
// We use Array.filter() to remove any non-JS files from the array
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Check if app is ready
discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

// Log in to Discord with your client's token
discordClient.login(process.env.BOT_TOKEN);

// iterate through all command files in /commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file); // -> /commands/<someCommand>.js
  const command = require(filePath); // require the command module
  // set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    discordClient.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// IMPORTANT NOTE: Every slash command is an interaction
// Create an eventlistener for the interaction event
discordClient.on(Events.InteractionCreate, async interaction => {
  // Ensure that only slash commands are handled in this function
  if (!interaction.isChatInputCommand()) return;

  // get the matching command from the client.commands based on the interaction.commandName
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// const commandHandler = require("./commands/movies");

// discordClient.on("messageCreate", commandHandler);
