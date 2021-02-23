var fc = require('./src/build/Feistel_Cipher.js')
var fs = require('fs')
var Discord = require('discord.js')
var commands = require('./src/build/commands.js')

//{"token": "12345", "channels": [], "names": [], "keys": []}

const bot = new Discord.Client()

fs.readFile('config.json', (err, config) => {
    if (err) return commands.getConfig(config => {
        bot.login(config.token)
    })
    config = JSON.parse(config)
    bot.login(config.token)
});

console.log(fc.encrypt('lol', '1234567890'))