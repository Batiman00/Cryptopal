const pkcs = (stringHex, bytes = 16) => {
    var pad  = bytes - ((stringHex.length / 2) % bytes);
    pad === 0 ? pad = bytes.toString(16).padStart(2, 0) : pad = pad.toString(16).padStart(2, 0);
    return stringHex.concat(pad.repeat(parseInt(pad, 16)));
}
