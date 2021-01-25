const padValidation = (string) => {

    var n = string.charCodeAt(string.length - 1);
    var regex = `(.)\\1{${(n - 1)}}$`;
    if (string.search(regex) < 0) throw new Error('Invalid padding');

    return 'Correct padding !!'
}
