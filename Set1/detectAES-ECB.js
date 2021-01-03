/*Função de análise de frequência*/
const score = (line) => {
    var line = line.match(/.{1,32}/g).sort();
    var arr = [], avrg =0;
    for (let i = 0, j = 0; i < line.length; i++) {
        if (line[i] !== line[i + 1]) {
            let n = i - j + 1;
            arr.push({ key: line[i], frequency: n });
            avrg += n;
            j = i + 1;
        }
    }
    avrg /= arr.length;
    arr.unshift({ average: avrg });
    return arr;
};

/*Data = conteúdo do arquivo*/
let temp = data.match(/.{1,320}/g);

/*Deteção da linha*/
for (let j = 1; j < temp.length; j++) {
    let answ = score(temp[j]);
    if(answ[0].average > 1){
    console.log("For j = " + j ,answ);
}
}
