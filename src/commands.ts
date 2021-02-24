import * as readline from 'readline'
import * as colors from 'colors'
import * as fs from 'fs';

type config = {token: String, channels: String[], names: String[], keys: String[]};

/**
 * 
 * @param {(config: {token: String, channels: String[], names: String[], keys: String[]}) => any} callback 
 */
export function getConfig(callback: (config: config) => any){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter token to your bot: ', token => {
        rl.close();
        fs.writeFileSync('config.json', JSON.stringify({token}))
        callback({token, channels: [], names: [], keys: []})
    });
}

/**
 * 
 * @param {{token: String, channels: String[], names: String[], keys: String[]}} config 
 * @param {(channel: String) => any} callback 
 */
export function getChannel(config: config, callback: (channel: String) => any){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    if(config.channels.length > 0){
        console.log("Here are some old channels that you have used:\n\n" + config.channels.join('\n') + '\n\n')
    }

    rl.question('Enter id of a channel: ', channel => {
        rl.close();
        let isinArray: Boolean = false;
        config.channels.forEach(v => {isinArray = isinArray || v == channel})
        if(!isinArray){
            config.channels.push(channel)
            fs.writeFileSync('config.json', JSON.stringify(config))
        }
        callback(channel)
    });
}

/**
 * 
 * @param {{token: String, channels: String[], names: String[], keys: String[]}} config 
 * @param {(key: String) => any} callback 
 */
export function getKey(config: config, callback: (key: String) => any){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    if(config.keys.length > 0){
        console.log("Here are some old keys that you have used:\n\n" + config.keys.join('\n') + '\n\n')
    }

    rl.question('Enter a key: ', key => {
        rl.close();
        let isinArray: Boolean = false;
        config.keys.forEach(v => {isinArray = isinArray || v == key})
        if(!isinArray){
            config.keys.push(key)
            fs.writeFileSync('config.json', JSON.stringify(config))
        }
        callback(key)
    });
}

export function getName(config: config, callback: (name: String) => any){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    if(config.names.length > 0){
        console.log("Here are some old names that you have used:\n\n" + config.names.join('\n') + '\n\n')
    }

    rl.question('Enter a name: ', name => {
        rl.close();
        let isinArray: Boolean = false;
        config.names.forEach(v => {isinArray = isinArray || v == name})
        if(!isinArray){
            config.names.push(name)
            fs.writeFileSync('config.json', JSON.stringify(config))
        }
        callback(name)
    });
}