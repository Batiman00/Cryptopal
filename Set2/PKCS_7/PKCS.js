const pkcs = (string = '', bytes = 16, encode = "ASCII") => {

    encode = encode.toUpperCase()
    switch (encode) {
        case "ASCII":
            var pad = bytes - (string.length % bytes);
            pad === 0 ? pad = bytes : pad = pad;
            return string.concat(pad.toString(16).padStart(2, 0).repeat(pad));

        case "HEX":
            var pad = bytes - ((string.length / 2) % bytes);
            pad === 0 ? pad = bytes.toString(16).padStart(2, 0) : pad = pad.toString(16).padStart(2, 0);
            return string.concat(pad.repeat(parseInt(pad, 16)));
        default:
            throw new Error(`Invalid encode`);
    }

}
module.exports = pkcs;
