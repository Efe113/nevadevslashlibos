const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config(); 

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
    try {
        console.log(`${commands.length} adet (/) komutu yenileniyor.`);

        
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`${data.length} adet (/) komutu başarıyla yüklendi.`);
    } catch (error) {
        
        console.error(error);
    }
})();
