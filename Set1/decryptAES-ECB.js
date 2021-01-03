/*data = conteúdo do arquivo*/
var key = CryptoJS.enc.Utf8.parse('YELLOW SUBMARINE');

let answ = CryptoJS.AES.decrypt(data,key,{mode: CryptoJS.mode.ECB}).toString(CryptoJS.enc.Utf8);

console.log(answ);
