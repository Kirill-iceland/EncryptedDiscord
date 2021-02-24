"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.getKey = exports.getChannel = exports.getConfig = void 0;
var readline = require("readline");
var fs = require("fs");
/**
 *
 * @param {(config: {token: String, channels: String[], names: String[], keys: String[]}) => any} callback
 */
function getConfig(callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter token to your bot: ', function (token) {
        rl.close();
        fs.writeFileSync('config.json', JSON.stringify({ token: token }));
        callback({ token: token, channels: [], names: [], keys: [] });
    });
}
exports.getConfig = getConfig;
/**
 *
 * @param {{token: String, channels: String[], names: String[], keys: String[]}} config
 * @param {(channel: String) => any} callback
 */
function getChannel(config, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    if (config.channels.length > 0) {
        console.log("Here are some old channels that you have used:\n\n" + config.channels.join('\n') + '\n\n');
    }
    rl.question('Enter id of a channel: ', function (channel) {
        rl.close();
        var isinArray = false;
        config.channels.forEach(function (v) { isinArray = isinArray || v == channel; });
        if (!isinArray) {
            config.channels.push(channel);
            fs.writeFileSync('config.json', JSON.stringify(config));
        }
        callback(channel);
    });
}
exports.getChannel = getChannel;
/**
 *
 * @param {{token: String, channels: String[], names: String[], keys: String[]}} config
 * @param {(key: String) => any} callback
 */
function getKey(config, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    if (config.keys.length > 0) {
        console.log("Here are some old keys that you have used:\n\n" + config.keys.join('\n') + '\n\n');
    }
    rl.question('Enter a key: ', function (key) {
        rl.close();
        var isinArray = false;
        config.keys.forEach(function (v) { isinArray = isinArray || v == key; });
        if (!isinArray) {
            config.keys.push(key);
            fs.writeFileSync('config.json', JSON.stringify(config));
        }
        callback(key);
    });
}
exports.getKey = getKey;
function getName(config, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    if (config.names.length > 0) {
        console.log("Here are some old names that you have used:\n\n" + config.names.join('\n') + '\n\n');
    }
    rl.question('Enter a name: ', function (name) {
        rl.close();
        var isinArray = false;
        config.names.forEach(function (v) { isinArray = isinArray || v == name; });
        if (!isinArray) {
            config.names.push(name);
            fs.writeFileSync('config.json', JSON.stringify(config));
        }
        callback(name);
    });
}
exports.getName = getName;
