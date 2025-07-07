const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Etkileşim bir slash komutu değilse veya bottan geliyorsa işlem yapma
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`'${interaction.commandName}' adında bir komut bulunamadı.`);
            return;
        }

        try {
            // Komutu çalıştır
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            // Kullanıcıya hata mesajı gönder
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
            }
        }
    },
};