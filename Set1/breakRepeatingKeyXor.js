const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");
/*Função que separa uma string em blocos
e escolhe o n-ésimo carcteres de cada bloco */
const takeletter = (stringHex, n, tam) => {
    var result = '';
    var stringHex = stringHex.match(/.{1,2}/g);

    for (var z = n - 1; z < stringHex.length; z += tam) {
        result += stringHex[z];
    }

    return result;
}
/*Função de análise de frequência de caracteres em textos*/
const score = (stringHex) => {
    var stringHex = stringHex.match(/.{1,2}/g).sort();
    let arr = [], avrg = 0, coincidencia = 0;
    for (let i = 0, j = 0; i < stringHex.length; i++) {
        if (stringHex[i] !== stringHex[i + 1]) {
            let n = i - j + 1;
            arr.push({ key: stringHex[i], frequency: n, rFrequency: n / stringHex.length });
            avrg += n;
            j = i + 1;
        }
    }
    avrg /= stringHex.length;
    var variance = arr.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / arr.length;
    coincidencia = arr.reduce((acc, curr) => acc += (curr.frequency * (curr.frequency - 1)) / (stringHex.length * (stringHex.length - 1)), 0)
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
/*Função que inverte uma operação de xor*/
const findChar = (char1, char2) => (String.fromCharCode(parseInt(char1, 16) ^ char2.charCodeAt(0)));

/*Função para ordenar, em ordem crescrente de 
frequência, os elementos criados pela função score*/
const Compare = (a, b) => (b.frequency - a.frequency);

/*Função que,para um dado tamanha de palavra,
acha os caractéres mais prováveis de terem sido usados 
para codificar a mensagem.
No caso língua inglesa, adotar commonLetters =' aetoinrs';*/
const search = (data, keysize, commonLetters, start = 1) => {

    let letter = commonLetters.split('');

    for (let z = 1; z <= keysize; z++) {
        let array = score(takeletter(data, z, keysize)).sort(Compare);
        console.log("\n valor mais comum = " + array[start].key + " RF: " + array[start].rFrequency);
        for (let y = 0; y < letter.length; y++) {
            console.log("Possível" + z + "ª" + " chave: " + findChar(array[start].key, letter[y]) + ' ou ' + findChar(array[start + 1].key, letter[y]) + ' ou ' + findChar(array[start + 2].key, letter[y]));
        }
    }
}
