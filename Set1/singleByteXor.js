const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");
/*Função para testar as chaves*/
const singleByteXor = (text, key) => (text.match(/.{1,2}/g).reduce((acc,curr) => acc += String.fromCharCode(parseInt(curr, 16) ^ key.charCodeAt(0)),''));
/*Tente com todos os caracteres de b64*/
