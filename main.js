var fc = require('./src/build/Feistel_Cipher.js')
var fs = require('fs')
var Discord = require('discord.js')
var commands = require('./src/build/commands.js');
var colors = require('colors')
const { Console } = require('console');
const readline  = require('readline')

//{"token": "12345", "channels": [], "names": [], "keys": []}

let config;
let channel;
let key;
let name;

const Client = new Discord.Client()

fs.readFile('config.json', (err, _config) => {
    if (err) return commands.getConfig(_config => {
        config = _config
        Client.login(config.token)
    })
    config = JSON.parse(_config)
    Client.login(config.token)
});

Client.on('ready', () => {
    commands.getChannel(config, channel_ => {
    setTimeout(()                        => {
    commands.getKey(    config, key_     => {
    setTimeout(()                        => {
    commands.getName(   config, name_    => {
    setTimeout(async ()                  => {
        channel = channel_;
        key     = key_;
        name    = name_;
        console.log('-------------\n'.red)
        const oldMessages = (await Client.channels.resolve(channel).messages.fetch({limit: 10})).array()
        for(var i = oldMessages.length - 1; i >= 0; i--){
            try{ 
                const msg = oldMessages[i]
                const message = JSON.parse(fc.decrypt(msg.content, key))
                if(message.name == name){
                    console.log(message.name.red + ':\n' + message.content.grey + '\n')
                }else{
                    console.log(message.name.green + ':\n' + message.content.grey + '\n')
                }
            }catch(e){

            }
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.on('line', content => {
            Client.channels.resolve(channel).send(fc.encrypt(JSON.stringify({name, content}), key))
        });

    }, 1000)
    })
    }, 1000)
    })
    }, 1000)
    })
})

Client.on('message', msg => {
    if(msg.channel.id = channel){
        const message = JSON.parse(fc.decrypt(msg.content, key))
        if(message.name == name) return
        console.log(message.name.green + ':\n' + message.content.grey + '\n')
    }
})
