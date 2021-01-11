/*Função de conversão de base Hexadecimal para base64*/
const hexTo64 = (num = '') => {

  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/'.split("");
  
  var total = num.match(/.{1,3}/g).reduce((acc,curr) => acc += parseInt(curr,16).toString(2).padStart(12,0),'');
  total = total.match(/.{1,6}/g).reduce((acc,curr) => acc += b64[parseInt(curr,2)],'');

  return total; 
};
