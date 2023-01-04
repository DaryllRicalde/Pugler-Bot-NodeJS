// Bug: Cannot reply with interaction.reply

//  await interaction.reply('Working on it');
//  const result = await YOUR_FUNCTION();
//  await interaction.followUp(result);

require("dotenv").config();

const wait = require('node:timers/promises').setTimeout;
const axios = require("axios");

const { SlashCommandBuilder } = require("discord.js");
// const { ChatGPTAPIBrowser } = require("chatgpt");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: process.env.OPENAI_TOKEN
})
const openAI = new OpenAIApi(config);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("[Needs fix] Generates an image using a prompt"),
    async execute(interaction){
        const response = await openAI.createImage({
            prompt: "Kratos with a lightsaber",
            n: 2,
            size: "1024x1024",
        });
        await interaction.deferReply({ ephemeral: true });
        wait(4000)
        interaction.editReply({ content: response.data.data[0].url })
    }
};