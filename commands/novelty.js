// Some wacky replies

const { SlashCommandBuilder } = require("discord.js");

const wordsDB = require("../words-db.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rizz")
    .setDescription("Replies with a random rizz pun"),
  async execute(interaction) {
    const index = Math.floor(Math.random() * wordsDB.rizz.length)
    const word = wordsDB.rizz[index];
    await interaction.reply(`Master ${interaction.user.username} you are ${word}`);
  },
};
