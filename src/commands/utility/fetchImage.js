const env = require('dotenv').config();
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const unsplashClient = process.env.UNSPLASH_CLIENT_ID;
const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("draw")
        .setDescription("Posts random Image"),
    async execute(interaction)
    {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://api.unsplash.com/photos/random',
                headers: {
                    Authorization: `Client-ID ${unsplashKey}`,
                },
                params: {
                    topics: "film"
                }
            });
            await interaction.reply(response.data.urls.raw);
        } catch (error) {
            console.error(error);
        }
    },
};