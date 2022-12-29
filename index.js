const { Client, GatewayIntentBits } = require("discord.js");

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

// Check if app is ready
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
  });


// Log in to Discord with your client's token
discordClient.login(process.env.BOT_TOKEN);


// COMMAND: Send a rizz pun back after a user types "!rizz"
// Note: If the a channel ID/s is not specified, the bot will listen
// to all channels it is in
const wordsDB = require('./words-db.json');

// TODO: !help command => Return the current capabilities of Pugler
// Use Axios for fetching API data
discordClient.on('messageCreate',(msg) =>{
    // console.log(msg.content);
    if(msg.content === '!rizz'){
        // select a random rizz pun in the database
        const index = Math.floor(Math.random() * wordsDB.rizz.length)
        msg.channel.send(wordsDB.rizz[index]);
    } else if (msg.content === '!watch'){
      // return a list of 
    }
});