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


/*função para achar o tamanho da cifra  */
for (var i = 1, findLength = 0, arr = []; arr.length < 3; i++) {
    myString = '41'.repeat(i);
    var data = myString + b64ToHex(unknownString);
    var encry = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(data), key, { mode: CryptoJS.mode.ECB }).ciphertext.toString();
    if (typeof arr.find(x => x.size == encry.length) === "undefined") { arr.push({ size: encry.length, i: i }) }
}
console.log("Tamanho da chave:", arr[2].i - arr[1].i)

var myString = '41'.repeat(15);
var dictionary = []
for (var i = 0; i < 256; i++) {
    myString += i.toString(16).padStart(2, 0)
    var encry = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(myString), key, { mode: CryptoJS.mode.ECB }).ciphertext.toString().match(/.{1,32}/g);
    dictionary.push(encry[0])
    myString = myString.replace(/.{1,2}$/g, "");
}

myString = '41'.repeat(15);
unknw = b64ToHex(unknownString);
var answr = '';

while (unknw.length) {
    var data = myString + unknw;
    var encry = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(data), key, { mode: CryptoJS.mode.ECB }).ciphertext.toString().match(/.{1,32}/g);
    answr += String.fromCharCode(dictionary.indexOf(encry[0]));
    unknw = unknw.replace(/.{1,2}/, "");
}
console.log(answr)
