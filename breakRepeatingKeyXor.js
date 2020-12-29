const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+'.split("");

const takeletter = (string, n, tam) => {
    let result = '';
    string = string.match(/.{1,2}/g);

    for (let z = n - 1; z < string.length; z += tam) {
        result += string[z];
    }

    return result;
}

const score = (a) => {
    let arr = a.match(/.{1,2}/g).sort();
    let arr2 = [], avrg = 0, coincidencia = 0;
    for (let i = 0, j = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i + 1]) {
            let n = i - j + 1;
            arr2.push({ key: arr[i], frequency: n, rFrequency: n / arr.length });
            avrg += n;
            j = i + 1;
        }
    }
    avrg /= arr2.length;
    let variance = arr2.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / arr2.length;
    coincidencia = arr2.reduce((acc, curr) => acc += (curr.frequency * (curr.frequency - 1)) / (arr.length * (arr.length - 1)), 0)
    arr2.unshift({ average: avrg, variance: variance, deviation: Math.sqrt(variance), IC: coincidencia });

    return arr2;
};

const multByteXor = (text, key) => (text.match(/.{1,2}/g).reduce((acc, curr, index) => acc += String.fromCharCode(parseInt(curr, 16) ^ key[index % key.length].charCodeAt(0)), ''));

const b64ToHex = (str = '') => {
    let total = str.split('').map(x => b64.indexOf(x).toString(2).padStart(6, 0)).join("");
    total = total.match(/.{1,4}/g).reduce((acc, curr) => acc += parseInt(curr, 2).toString(16), '');

    return total;
};

const findChar = (char1, char2) => (String.fromCharCode(parseInt(char1, 16) ^ char2.charCodeAt(0)));
const Compare = (a, b) => (b.frequency - a.frequency);
const search = (data, keysize, commonLetters, start = 1) => {

    let letter = commonLetters.split('');

    for (let z = 1; z <= keysize; z++) {
        let array = score(takeletter(data, z, keysize)).sort(Compare);
        //console.log(array);
        console.log("\n valor mais comum = " + array[start].key + " RF: " + array[start].rFrequency);
        for (let y = 0; y < letter.length; y++) {
            console.log("Possível" + z + "ª" + " chave: " + findChar(array[start].key, letter[y]) + ' ou ' + findChar(array[start + 1].key, letter[y]) + ' ou ' + findChar(array[start + 2].key, letter[y]));
        }
    }
}
