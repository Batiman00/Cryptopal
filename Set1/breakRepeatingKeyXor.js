const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");
/*Função de análise de frequência de caracteres*/
const score = (stringHex) => {

    var arr = stringHex.match(/.{1,2}/g).sort().join('').match(/(..)\1*/g).map(x => ({ key: x.slice(0, 2), frequency: x.length / 2 }))
    var avrg = stringHex.length / (2 * arr.length);
    var variance = arr.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / arr.length;
    var coincidencia = arr.reduce((acc, curr) => acc += (curr.frequency * (curr.frequency - 1)) / ((stringHex.length/2) * ((stringHex.length/2) - 1)), 0)

    arr.unshift({ average: avrg, variance: variance, deviation: Math.sqrt(variance), IC: coincidencia });

    return arr;
};
/*Função que implementa o xor de uma string com um plavra*/
const multByteXor = (textHex, key) => (textHex.match(/.{1,2}/g).reduce((acc, curr, index) => acc += String.fromCharCode(parseInt(curr, 16) ^ key[index % key.length].charCodeAt(0)), ''));
/*Função de conversão de bases*/
const b64ToHex = (str = '') => {
    var total = str.split('').map(x => b64.indexOf(x) < 0 ? "" : b64.indexOf(x).toString(2).padStart(6, 0)).join("");
    if(total.match(/.{1,4}/g).slice(-1) == 0){ total = total.match(/.{1,4}/g).slice(0,-1).join('')}
    total = total.match(/.{1,4}/g).reduce((acc, curr) => acc += parseInt(curr, 2).toString(16), '');

    return total;
};

/*Função que,para um dado tamanha de palavra,
acha os caractéres mais prováveis de terem sido usados 
para codificar a mensagem.
No caso língua inglesa, adotar commonLetters =' aetoinrs';*/
const search = (data, keysize, commonLetters, start = 1) => {

    var letter = commonLetters.split('');

    function findChar(char1, char2) { return String.fromCharCode(parseInt(char1, 16) ^ char2.charCodeAt(0)) }
    function compare(a, b) { b.frequency - a.frequency }
    function takeletter(stringHex, n, tam) { return stringHex.match(new RegExp(`.{1,${2 * tam}}`, "g")).reduce((acc, curr) => acc += curr.slice(2 * (n - 1), 2 * (n + 1)), '') }

    for (var z = 1; z <= keysize; z++) {
        var array = score(takeletter(data, z, keysize)).sort(compare);
        console.log(`\nValor mais comum = ${array[start].key} RF: ${array[start].rFrequency.toFixed(3)}`);
        for (var y = 0; y < letter.length; y++) {
            console.log(`Possível ${z + 1}ª chave: ${findChar(array[start].key, letter[y])} ou ${findChar(array[start + 1].key, letter[y])} ou ${findChar(array[start + 2].key, letter[y])}`);
        }
    }
}
