import * as crypto from 'crypto';

/**
 * Encrypts content with a key
 * @param {String} content - max 
 * @param {String} key 
 * @param {Number} rounds 
 * @returns {String} encrypted content
 */
export function encrypt(content: String, key: String, rounds: number = 10): String{
    const keyx_length = Math.floor(key.length / rounds)
    const string_size = Math.floor(content.length / 2)
    let string1 = Buffer.from(content.substring(0, string_size), 'utf-8')
    let string2 = Buffer.from(content.substring(string_size), 'utf-8')
    for(var i = 0; i < rounds; i++){
        var keyx: String;
        if(i == rounds - 1){
            keyx = key.substring(keyx_length * i);
        }else{
            keyx = key.substring(keyx_length * i, keyx_length * (i + 1));
        }
        
        const string11 = string2;
        const string21 = XOR_Buffer(string1, crypto.createHash('sha256').update(string2.toString('hex') + keyx).digest());
        // console.log(string11 + " - " + string21.toString('hex'))

        string1 = string11;
        string2 = string21;
    }

    return string2.toString('hex') + string1.toString('hex');
}


/**
 * Encrypts content with a key
 * @param {String} content - max 
 * @param {String} key 
 * @param {Number} rounds 
 * @returns {String} encrypted content
 */
export function decrypt(content: String, key: String, rounds: number = 10): String{
    const keyx_length = Math.floor(key.length / rounds)
    const string_size = Math.floor(content.length / 2)
    let string1 = Buffer.from(content.substring(0, string_size), 'hex')
    let string2 = Buffer.from(content.substring(string_size), 'hex')
    for(var i = rounds - 1; i >= 0; i--){
        var keyx: String;
        if(i == rounds - 1){
            keyx = key.substring(keyx_length * i);
        }else{
            keyx = key.substring(keyx_length * i, keyx_length * (i + 1));
        }
        
        const string11 = string2;
        const string21 = XOR_Buffer(string1, crypto.createHash('sha256').update(string2.toString('hex') + keyx).digest());

        string1 = string11;
        string2 = string21.remove0();
    }

    return string2.toString('utf-8') + string1.toString('utf-8');
}




/**
 * 
 * @param {Buffer} Buffer1 
 * @param {Buffer} Buffer2 
 */
export function XOR_Buffer(Buffer1: Buffer, Buffer2: Buffer): Buffer{
    const l1 = Buffer1.length
    const l2 = Buffer2.length

    let result: Buffer;
    if(l1 > l2){
        result = Buffer.from(Buffer1);
    }else{
        result = Buffer.from(Buffer2);
    }

    for(var i = 1; i <= Math.min(l1, l2); i++){
        result[result.length - i] = Buffer1[l1 - i] ^ Buffer2[l2 - i];
    }

    return result;
}

declare global {
    interface Buffer {
        remove0(): Buffer;
    }
  }
Buffer.prototype.remove0 = function (){
    let res: Buffer;
    for(var i = 0; i < this.length; i++){
        res = Buffer.from(this).subarray(i);
        if(this[i] != 0){
            return this.subarray(i);
        }
    }
    return res;
}