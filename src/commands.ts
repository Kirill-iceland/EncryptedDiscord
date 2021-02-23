import * as readline from 'readline'
import * as colors from 'colors'
import * as fs from 'fs';

export function getConfig(callback: (callback: Object) => any){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter token to your bot: ', token => {
        fs.writeFileSync('config.json', JSON.stringify({token}))
        callback({token})
    });
}