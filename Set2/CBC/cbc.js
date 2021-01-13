const decryptCBC = (cipherTextHex, key, IV) => {
    const CryptoJS = require("crypto-js");
    key = CryptoJS.enc.Utf8.parse(key);

    function ciphertext(cText) { return CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cText) }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };

    cipherTextHex = cipherTextHex.match(/.{1,32}/g);
    var arr = xor(ciphertext(cipherTextHex[0]), IV);
    cipherTextHex.slice(1).forEach((x, index) => arr += xor(ciphertext(x), cipherTextHex[index]));

    var n = parseInt(arr.slice(-2), 16);
    var position = arr.search(`(${n.toString(16).padStart(2, 0)})\\1{${(n - 1)}}$`)
    if (position < 0) { throw new Error('Invalid padding') }
    return arr.slice(0, position);
}

const recursiveDecryptCBC = (cipherTextHex, key, IV) => {
    const CryptoJS = require("crypto-js");
    key = CryptoJS.enc.Utf8.parse(key);

    function ciphertext(cText) { return CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cText) }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };
    function core(position) { return position !== cipherTextHex.length ? xor(cipherTextHex[position - 1], ciphertext(cipherTextHex[position])) + core(++position) : '' }

    cipherTextHex = cipherTextHex.match(/.{1,32}/g);
    var arr = xor(ciphertext(cipherTextHex[0]), IV) + core(1);

    var n = parseInt(arr.slice(-2), 16);
    var position = arr.search(`(${n.toString(16).padStart(2, 0)})\\1{${(n - 1)}}$`)
    if (position < 0) { throw new Error('Invalid padding') }
    return arr.slice(0, position);
}
module.exports = recursiveDecryptCBC;
module.exports = decryptCBC;
