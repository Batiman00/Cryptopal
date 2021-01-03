/*Função que faz o xor de uma string com outra */
const xor = (aStringHex, bStringHex) => (aStringHex.split('').reduce((acc,curr,index) => acc += (parseInt(curr,16) ^ parseInt(bStringHex[index],16)).toString(16) ,''));
