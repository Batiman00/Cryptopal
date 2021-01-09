const CTR = (textHex, nonce, counterLength = 8) => {

    nonce = nonce.padStart(32 - 2 * counterLength, 0);
    textHex = textHex.match(/.{1,32}/g);

    function cipherblock(counter) { return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse((counter + nonce).padStart(32, 0)), key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };
    
    return textHex.reduce((acc, curr, index) => acc += xor(curr, cipherblock(index)), '')
}

const recursiveCTR = (textHex, nonce, counterLength = 8) => {

    nonce = nonce.padStart(32 - 2 * counterLength, 0);
    textHex = textHex.match(/.{1,32}/g);
    var counter = 0;

    function cipherblock(counter) { return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse((counter + nonce).padStart(32, 0)), key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() };
    function xor(a, b) { return a.split('').reduce((acc, curr, index) => acc += (parseInt(curr, 16) ^ parseInt(b[index], 16)).toString(16), '') };
    function recursion(position) { return position < textHex.length ? xor(textHex[position], cipherblock((counter++).toString(16))) + recursion(++position) : '' }

    return recursion(0);
}
