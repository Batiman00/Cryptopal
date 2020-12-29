const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/'.split("");

const score = (a) => {
    let arr = a.match(/.{1,2}/g).sort();
    let arr2 = [], avrg = 0;
    for (let i = 0, j = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i + 1]) {
            let n = i - j + 1;
            arr2.push({ key: arr[i], frequency: n });
            avrg += n;
            j = i + 1;
        }
    }
    avrg /= arr2.length;
    let variance = arr2.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / arr2.length;
    arr2.unshift({ average: avrg, variance: variance, deviation: Math.sqrt(variance) });
    return arr2;
};

const singleByteXor = (text, key) => {
    let bin = text.match(/.{1,2}/g).map(x => parseInt(x, 16));
    let result = bin.map(x => x ^= key.charCodeAt(0));
    return result.map(x => String.fromCharCode(x));
};
