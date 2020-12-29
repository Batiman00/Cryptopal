const multByteXor = (text, key) => (text.match(/.{1,2}/g).reduce((acc, curr, index) => acc += String.fromCharCode(parseInt(curr, 16) ^ key[index % key.length].charCodeAt(0)), ''));

const asciiToHex = (string) => (string.split('').reduce((acc, curr) => acc += curr.charCodeAt(0).toString(16).padStart(2, 0), ''));
