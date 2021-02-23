"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var readline = require("readline");
var fs = require("fs");
function getConfig(callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter token to your bot: ', function (token) {
        fs.writeFileSync('config.json', JSON.stringify({ token: token }));
        callback({ token: token });
    });
}
exports.getConfig = getConfig;
