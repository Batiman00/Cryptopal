const recursiveDecryptCBC = require("./CBC");
const decryptCBC = require("./CBC");
const CryptoJS = require("crypto-js");

const KEY = CryptoJS.lib.WordArray.random(8);
const chave = CryptoJS.enc.Hex.stringify(KEY)
const Ini = CryptoJS.lib.WordArray.random(8);
const IV = CryptoJS.enc.Hex.stringify(Ini)

var data = `Nosso ceu tem mais estrelas,
Nossas varzeas tem mais flores,
Nossos bosques tem mais vida,
Nossa vida mais amores.`;

var data = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(KEY), { iv: Ini }).ciphertext.toString();
var gab = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(data) }, CryptoJS.enc.Utf8.parse(KEY), { iv: Ini }).toString()

test(`teste 1 decrypt`, () => {
    expect(decryptCBC(data, chave, IV)).toBe(gab);
});
test(`teste 1 decryptRecursive`, () => {
    expect(recursiveDecryptCBC(data, chave, IV)).toBe(gab);
});
