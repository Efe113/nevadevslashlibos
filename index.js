// Gerekli modülleri ve sınıfları içe aktar
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // .env dosyasındaki değişkenleri yükler

// Yeni bir client (bot) örneği oluştur
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Komutları saklamak için bir Collection oluştur
client.commands = new Collection();

// --- KOMUT YÜKLEYİCİ ---
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Komut dosyasında 'data' ve 'execute' özellikleri varsa komutu yükle
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`[BİLGİ] ${command.data.name} adlı komut yüklendi.`);
    } else {
        console.log(`[UYARI] ${filePath} dosyasındaki komut, gerekli "data" veya "execute" özelliklerine sahip değil.`);
    }
}

// --- EVENT (OLAY) YÜKLEYİCİ ---
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        // Eğer event sadece bir kez çalışacaksa 'once' kullan
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        // Diğer tüm eventler için 'on' kullan
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Botu token ile Discord'a giriş yaptır
client.login(process.env.TOKEN);