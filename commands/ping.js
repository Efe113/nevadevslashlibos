const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun gecikme süresini gösterir.'),
    async execute(interaction) {
        // 'interaction.client.ws.ping' botun Discord API'sine olan gecikmesini ms cinsinden verir.
        await interaction.reply(`Pong! 🏓 Bot Gecikmesi: ${interaction.client.ws.ping}ms`);
    },
};