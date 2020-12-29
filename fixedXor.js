const xor = (a, b) => (a.split('').reduce((acc,curr,index) => acc += (parseInt(curr,16) ^ parseInt(b[index],16)).toString(16) ,''));
