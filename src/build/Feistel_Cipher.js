"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XOR_Buffer = exports.decrypt = exports.encrypt = void 0;
var crypto = require("crypto");
/**
 * Encrypts content with a key
 * @param {String} content - max
 * @param {String} key
 * @param {Number} rounds
 * @returns {String} encrypted content
 */
function encrypt(content, key, rounds) {
    if (rounds === void 0) { rounds = 10; }
    var keyx_length = Math.floor(key.length / rounds);
    var string_size = Math.floor(content.length / 2);
    var string1 = Buffer.from(content.substring(0, string_size), 'utf-8');
    var string2 = Buffer.from(content.substring(string_size), 'utf-8');
    for (var i = 0; i < rounds; i++) {
        var keyx;
        if (i == rounds - 1) {
            keyx = key.substring(keyx_length * i);
        }
        else {
            keyx = key.substring(keyx_length * i, keyx_length * (i + 1));
        }
        var string11 = string2;
        var string21 = XOR_Buffer(string1, crypto.createHash('sha256').update(string2.toString('hex') + keyx).digest());
        // console.log(string11 + " - " + string21.toString('hex'))
        string1 = string11;
        string2 = string21;
    }
    return string2.toString('hex') + string1.toString('hex');
}
exports.encrypt = encrypt;
/**
 * Encrypts content with a key
 * @param {String} content - max
 * @param {String} key
 * @param {Number} rounds
 * @returns {String} encrypted content
 */
function decrypt(content, key, rounds) {
    if (rounds === void 0) { rounds = 10; }
    var keyx_length = Math.floor(key.length / rounds);
    var string_size = Math.floor(content.length / 2);
    var string1 = Buffer.from(content.substring(0, string_size), 'hex');
    var string2 = Buffer.from(content.substring(string_size), 'hex');
    for (var i = rounds - 1; i >= 0; i--) {
        var keyx;
        if (i == rounds - 1) {
            keyx = key.substring(keyx_length * i);
        }
        else {
            keyx = key.substring(keyx_length * i, keyx_length * (i + 1));
        }
        var string11 = string2;
        var string21 = XOR_Buffer(string1, crypto.createHash('sha256').update(string2.toString('hex') + keyx).digest());
        string1 = string11;
        string2 = string21.remove0();
    }
    return string2.toString('utf-8') + string1.toString('utf-8');
}
exports.decrypt = decrypt;
/**
 *
 * @param {Buffer} Buffer1
 * @param {Buffer} Buffer2
 */
function XOR_Buffer(Buffer1, Buffer2) {
    var l1 = Buffer1.length;
    var l2 = Buffer2.length;
    var result;
    if (l1 > l2) {
        result = Buffer.from(Buffer1);
    }
    else {
        result = Buffer.from(Buffer2);
    }
    for (var i = 1; i <= Math.min(l1, l2); i++) {
        result[result.length - i] = Buffer1[l1 - i] ^ Buffer2[l2 - i];
    }
    return result;
}
exports.XOR_Buffer = XOR_Buffer;
Buffer.prototype.remove0 = function () {
    var res;
    for (var i = 0; i < this.length; i++) {
        res = Buffer.from(this);
        if (this[i] != 0) {
            return this.subarray(i);
        }
    }
    return res;
};
