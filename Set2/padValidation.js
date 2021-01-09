const padValidation = (string) => {
    var n = string.charCodeAt(string.length - 1);
    if (string.search(`(.)\\1{${(n - 1)}}$`) !== string.length - n) throw new Error('Invalid padding'); 
}
