/*Função de analálise de frequência de caracteres em textos*/
const score = (stringHex) => {
    var stringHex = stringHex.match(/.{1,2}/g).sort();
    let arr = [], avrg = 0;
    for (let i = 0, j = 0; i < stringHex.length; i++) {
        if (stringHex[i] !== stringHex[i + 1]) {
            var n = i - j + 1;
            arr.push({ key: stringHex[i], frequency: n });
            avrg += n;
            j = i + 1;
        }
    }
    avrg /= stringHex.length;
    var variance = stringHex.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / stringHex.length;
    arr.unshift({ average: avrg, variance: variance, deviation: Math.sqrt(variance) });
    return arr;
};
/*Função para testar as chaves*/
const singleByteXor = (text, key) => (text.match(/.{1,2}/g).reduce((acc,curr) => acc += String.fromCharCode(parseInt(curr, 16) ^ key.charCodeAt(0)),''));
