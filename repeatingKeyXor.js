/*Função que cifra um texto em hexadecimal, com uma string*/
const multByteXor = (textHex, key) => (textHex.match(/.{1,2}/g).reduce((acc, curr, index) => acc += String.fromCharCode(parseInt(curr, 16) ^ key[index % key.length].charCodeAt(0)), ''));
/*Função de conversão*/
const asciiToHex = (string) => (string.split('').reduce((acc, curr) => acc += curr.charCodeAt(0).toString(16).padStart(2, 0), ''));
