class CryptoAnalysis {

  constructor(_text, _fromEncode = "HEX", _commonLetter = ' eatoinrs') {
    switch (_fromEncode.toUpperCase()) {
      case "HEX":
        this.text = _text;
        break;
      case "BASE64":
        this.text = CryptoAnalysis.b64ToHex(_text);
        break;
      case "ASCII":
        this.text = CryptoAnalysis.asciiToHex(_text);
        break;
      default:
        throw new Error('Invalid Encode')
    }
    this.fromEncode = _fromEncode.toUpperCase();
    this.commonLetters = _commonLetter.split('');
    this.keySize = 1;
  }

  set defineKeySize(num = 1) {
    if (isNaN(num)) { throw new Error("Keysize must be numerical"); }
    else { this.keySize = num };
  }

  takeletter(n, tam) {
    return this.text.match(new RegExp(`.{1,${2 * tam}}`, "g")).reduce((acc, curr) => acc += curr.match(/.{1,2}/g)[n - 1], '')
  };

  static findChar(char1, char2) { return String.fromCharCode(parseInt(char1, 16) ^ char2.charCodeAt(0)) }

  printGuesses(start = 1) {
    for (var z = 1; z <= this.keySize; z++) {
      var array = this.score(this.takeletter(z, this.keySize)).sort((a, b) => (b.frequency - a.frequency));
      console.log(`\nValor mais comum = ${array[start].key}`);
      for (var y = 0; y < this.commonLetters.length; y++) {
        console.log(`Possível ${z}ª chave: ${CryptoAnalysis.findChar(array[start].key, this.commonLetters[y])} ou ${CryptoAnalysis.findChar(array[start + 1].key, this.commonLetters[y])} ou ${CryptoAnalysis.findChar(array[start + 2].key, this.commonLetters[y])}`.replace("/\n/g", "|n"));
      }
    }
  }

  default() {

    var guess = '';

    for (var z = 1; z <= this.keySize; z++) {
      var array = this.score(this.takeletter(z, this.keySize)).sort((a, b) => (b.frequency - a.frequency));
      guess += String.fromCharCode(parseInt(array[1].key, 16) ^ this.commonLetters[0].charCodeAt(0))
    }
    return guess;
  }

  score = (stringHex) => {

    var arr = stringHex.match(/.{1,2}/g).sort().join('').match(/(..)\1*/g).map(x => ({ key: x.slice(0, 2), frequency: x.length / 2 }))
    var avrg = stringHex.length / (2 * arr.length);
    var variance = arr.reduce((acc, curr) => acc += (curr.frequency - avrg) ** 2, 0) / arr.length;
    var coincidencia = arr.reduce((acc, curr) => acc += (curr.frequency * (curr.frequency - 1)) / ((stringHex.length / 2) * ((stringHex.length / 2) - 1)), 0)

    arr.unshift({ average: avrg, variance: variance, deviation: Math.sqrt(variance), IC: coincidencia });

    return arr;
  };

  findKeySize(ini = 2, final = 50) {
    final = final || Math.min(50, this.text / 5);
    for (var n = ini; n <= final; n++) {
      var temp = this.takeletter(1, n);
      console.log(`\n${n} IC:  ${this.score(temp)[0].IC}`);
      console.log(`${n} Deviation:  ${this.score(temp)[0].deviation}\n`);
    }
  }

  static asciiToHex(string) { return string.split('').reduce((acc, curr) => acc += curr.charCodeAt(0).toString(16).padStart(2, 0), '') };
  static b64ToHex(str) {

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('')
    var total = str.split('').map(x => b64.indexOf(x) < 0 ? "" : b64.indexOf(x).toString(2).padStart(6, 0)).join("");
    if (total.match(/.{1,4}/g).slice(-1) == 0) { total = total.match(/.{1,4}/g).slice(0, -1).join('') }
    total = total.match(/.{1,4}/g).reduce((acc, curr) => acc += parseInt(curr, 2).toString(16), '');

    return total;
  };
  static hexToAscii(string) { return string.match(/.{1,2}/g).reduce((acc, curr) => acc += String.fromCharCode(parseInt(curr, 16)), '') }
  static hexTo64(num) {
    let total = num.match(/.{1,3}/g).map(x => parseInt(x, 16).toString(2).padStart(12, 0)).join("");
    total = total.match(/.{1,6}/g).reduce((acc, curr) => acc += b64[parseInt(curr, 2)], '');

    return total;
  };

}
/*Resolução */
//data = mensagem criptografada
/*
const xor = (a, b) => { return a.match(/.{1,2}/g).reduce((acc, curr, index) => acc += String.fromCharCode(parseInt(curr,16) ^ b[index % b.length].charCodeAt(0) ), '') };

var doc = new CryptoAnalysis(data, "base64")
doc.defineKeySize = 29
var chave = doc.default();
console.log(`Chave: ${chave}\n`)
answr = xor(CryptoAnalysis.b64ToHex(data),chave)
console.log(`Mensagem: ${answr}`)
*/
