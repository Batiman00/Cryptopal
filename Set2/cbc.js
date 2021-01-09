const CryptoJS = require("crypto-js");

const decryptCBC = (cipherTextHex, key, IV) => {

    cipherTextHex = cipherTextHex.match(/.{1,32}/g);
    var arr = xor(ciphertext(cipherTextHex[0], key), IV);

    function ciphertext(cText) { return CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cText) }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };

    cipherTextHex.slice(1).forEach((x, index) => arr += xor(ciphertext(x, key), cipherTextHex[index]));

    return arr;
}

const recursiveDecryptCBC = (cipherTextHex, key, IV) => {

    cipherTextHex = cipherTextHex.match(/.{1,32}/g);

    function ciphertext(cText) { return CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cText) }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };
    function core(position) { return position !== cipherTextHex.length ? xor(cipherTextHex[position - 1], ciphertext(cipherTextHex[position])) + core(++position) : '' }

    return xor(ciphertext(cipherTextHex[0]),IV) + core(1);
}
