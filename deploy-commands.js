const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config(); // .env dosyasındaki değişkenleri yükler

const commands = [];
// commands klasöründeki tüm komut dosyalarını oku
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// REST modülünün bir örneğini oluştur ve token'ı ayarla
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Komutları dağıt!
(async () => {
    try {
        console.log(`${commands.length} adet (/) komutu yenileniyor.`);

        // Komutları belirtilen sunucuya (guild) göndermek için 'put' metodu
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`${data.length} adet (/) komutu başarıyla yüklendi.`);
    } catch (error) {
        // Hataları yakala ve konsola yazdır
        console.error(error);
    }
})();