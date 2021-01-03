/*Função que faz o xor de uma string com */
const xor = (aStringHex, bStringHex) => (aStringHex.split('').reduce((acc,curr,index) => acc += (parseInt(curr,16) ^ parseInt(StringHex[index],16)).toString(16) ,''));
