const CryptoJS = require("crypto-js");
const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+'.split("");
var key = CryptoJS.lib.WordArray.random(16);

const unknownString = `Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkg
aGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBq
dXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUg
YnkK`.replace(/\n/g, '');

const b64ToHex = (str = '') => {
    let total = str.split('').map(x => b64.indexOf(x).toString(2).padStart(6, 0)).join("");
    total = total.match(/.{1,4}/g).reduce((acc, curr) => acc += parseInt(curr, 2).toString(16), '');

    return total;
};

/* Tabela */
var myString = 'A'.repeat(15);
var dictionary = []
for (var i = 0; i < 256; i++) {
    myString += String.fromCharCode(i)
    var encry = CryptoJS.AES.encrypt(myString, key, { mode: CryptoJS.mode.ECB }).ciphertext.toString().match(/.{1,32}/g);
    dictionary.push(encry[0])
    myString = myString.slice(0, -1);
}

/*Bloco de referência*/
var reference = CryptoJS.AES.encrypt('A'.repeat(16), key, { mode: CryptoJS.mode.ECB }).ciphertext.toString().match(/.{1,32}/g);
unknw = b64ToHex(unknownString);
var answr = '';
myString = '41'.repeat(16 * 3 - 1);

while (unknw.length) {

    /*Gerando um prefixo de tamanho variável*/
    var prefix = '', num = CryptoJS.lib.WordArray.random(1);
    num = parseInt(CryptoJS.enc.Hex.stringify(num), 16) / 4;
    for (var i = 0; i < num; i++) { prefix += ((Math.random() * 100) % 256).toString(16).padStart(2, 0); }
    
    var data = prefix + myString + unknw;
    var encry = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(data), key, { mode: CryptoJS.mode.ECB }).ciphertext.toString().match(/.{1,32}/g);
    var c = encry.indexOf(reference[0])
    if (c > -1 && encry[c + 1] === reference[0] && dictionary.indexOf(encry[c + 2]) > -1) {
        answr += String.fromCharCode(dictionary.indexOf(encry[c + 2]));
        unknw = unknw.replace(/.{1,2}/, "");
    }
}
console.log(answr)
