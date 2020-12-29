const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/'.split("");

const singleByteXor = (text, key) => (text.match(/.{1,2}/g).reduce((acc,curr) => acc += String.fromCharCode(parseInt(curr, 16) ^ key.charCodeAt(0)),''));
/*Apenas tente com todas as chaves*/
