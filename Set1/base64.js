/*Função de conversão de base Hexadecimal para base64*/
const b64ToHex = (str = '') => {
    const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var total = str.split('').map(x => b64.indexOf(x) < 0 ? "" : b64.indexOf(x).toString(2).padStart(6, 0)).join("");
    if (total.match(/.{1,4}/g).slice(-1) == 0) { total = total.match(/.{1,4}/g).slice(0, -1).join('') }
    total = total.match(/.{1,4}/g).reduce((acc, curr) => acc += parseInt(curr, 2).toString(16), '');

    return total;
};
