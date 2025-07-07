.env dosyasını doldur: Discord Developer Portal'a git, bir bot oluştur (veya mevcut olanı kullan), "Bot" sekmesinden TOKEN'ını al. "OAuth2 -> General" sekmesinden CLIENT ID'sini al. Geliştirme yapacağın Discord sunucusunun ID'sini al (Sunucu adına sağ tık > ID'yi Kopyala. Bu seçenek görünmüyorsa Discord ayarlarından Geliştirici Modu'nu açmalısın).

Komutları Kaydet: Terminali aç ve aşağıdaki komutu çalıştır. Bu işlemi sadece yeni komut eklediğinde veya mevcut komutların adını/açıklamasını değiştirdiğinde yapman yeterlidir.

```bash
npm run deploy
```

veya

```bash
node deploy-commands.js
```

Botu Başlat: Her şey hazır! Botu başlatmak için terminale şunu yaz:

```bash
npm start
```

veya

```bash
node index.js
```

**Bu Altyapı Neva Development Sunucusuna Aittir. Herhangi gibi Çalma Veya Kopyalanma Durumunda İşlem Uygulanacaktır.**
