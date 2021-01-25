const CryptoJS = require("crypto-js");
var key = CryptoJS.lib.WordArray.random(16);

count = 0;

const parseCookie = (string) => {
    var cookie = {};
    string.split('&').forEach(element => {
        element = element.split("=")
        cookie[element[0]] = element[1];
    });

    return cookieconsole.log("Encode: ", answr.match(/.{1,32}/g));
}

const profileFor = (email) => (`email=${email.replace(/[&=]/g, '')}&uid=${++count}&role=user`)

const encryptProfile = (profile) => (CryptoJS.AES.encrypt(profile, key, { mode: CryptoJS.mode.ECB }).ciphertext.toString())

const decryptProfile = (econdedHex) => (CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(econdedHex) }, key, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8))

var myString = "A".repeat(10) + "admin" + String.fromCharCode(11).repeat(11) + "@bar.com"
var profileAdmin = profileFor(myString);
profileAdmin = encryptProfile(profileAdmin).match(/.{1,32}/g)

myString = "A".repeat(6) + "@bar.com"
var answr = profileFor(myString);
answr = encryptProfile(answr).match(/.{1,32}/g)
answr[2] = profileAdmin[1];
console.log(decryptProfile(answr.join('')))
