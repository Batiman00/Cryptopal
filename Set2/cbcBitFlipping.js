const CryptoJS = require("crypto-js");
const prefix = "comment1=cooking%20MCs;userdata=";
const suffix = ";comment2=%20like%20a%20pound%20of%20bacon";
var key = CryptoJS.lib.WordArray.random(16);
var IV = CryptoJS.lib.WordArray.random(16);

const modify = (input) => {

    var string = prefix + input.replace(/[;=]/g, '') + suffix;

    return CryptoJS.AES.encrypt(string, key, { mode: CryptoJS.mode.CBC, iv: IV }).ciphertext.toString();
}

const checkAdmin = (inputHex) => {
    inputHex = CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(inputHex)}, key, { mode: CryptoJS.mode.CBC, iv: IV }).toString()
    inputHex = hexToAscii(inputHex);
    return inputHex.indexOf(";admin=true;") < 0 ?  false : true;
}
const hexToAscii = (stringHex) => (stringHex.match(/.{1,2}/g).reduce((acc, curr) => acc += String.fromCharCode(parseInt(curr, 16)), ""));

myString = "AadminAtrue";
var tampered = myString.match(/.{1,2}/g)
tampered[16] = (parseInt(tampered[16],16) ^ ';'.charCodeAt(0) ^ 'A'.charCodeAt(0)).toString(16).padStart(2,0);
tampered[16 + 6] = (parseInt(tampered[16 + 6],16) ^ '='.charCodeAt(0) ^ 'A'.charCodeAt(0)).toString(16).padStart(2,0);
tampered = tampered.join('')

console.log(checkAdmin(tampered));
