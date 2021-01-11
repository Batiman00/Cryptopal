const hexTo64 = require('./base64');

test('teste 1', () => {
    expect(hexTo64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"))
    .toBe("SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t");
});

test('teste 2', () => {
    expect(hexTo64("45440b171d5c1b21342e021c3a0eee7373215c4024f0eb733cf006e2040c22015e420b07ef21164d5935e82338452f42282c1836e42536284c450de3"))
    .toBe("RUQLFx1cGyE0LgIcOg7uc3MhXEAk8OtzPPAG4gQMIgFeQgsH7yEWTVk16CM4RS9CKCwYNuQlNihMRQ3j");
});
test('teste 3', () => {
    expect(hexTo64("371d39121605584f48217235ee1e0602445c162e4942254c071954"))
    .toBe("Nx05EhYFWE9IIXI17h4GAkRcFi5JQiVMBxlU");
});
test('teste 4', () => {
    expect(hexTo64("5f5731e5203116ee131a4a4b24112cef5d0822f035e6547d3a0014462f26"))
    .toBe("X1cx5SAxFu4TGkpLJBEs710IIvA15lR9OgAURi8m");
});


