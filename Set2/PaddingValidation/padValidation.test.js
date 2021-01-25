const padValidation = require("./padValidation");

test("teste correct padding 1 (ASCII)", () => {
    var string = "ICE ICE BABY" + String.fromCharCode(4).repeat(4);
    expect(padValidation(string))
        .toBe(`Correct padding !!`);
});
test("teste incorrect padding 2 (ASCII)", () => {
    var string = "ICE ICE BABY" + String.fromCharCode(5).repeat(4);
    expect(() => { padValidation(string) })
        .toThrow(`Invalid padding`);
});
test("teste incorrect padding 3 (ASCII)", () => {
    var string = "ICE ICE BABY" + String.fromCharCode(1) + String.fromCharCode(2) + String.fromCharCode(3) + String.fromCharCode(4)
    expect(() => { padValidation(string) })
        .toThrow(`Invalid padding`);
});
test("teste correct padding 4 (HEX)", () => {
    var string = "F14ADBDA019D6DB7EFD91546E3FF84449BCB" + String.fromCharCode(14).toString(16).repeat(14);
    expect(padValidation(string))
        .toBe(`Correct padding !!`);
});
test("teste incorrect padding 5 (HEX)", () => {
    var string = "F14ADBDA019D6DB7EFD91546E3FF84449BCB" + String.fromCharCode(250).toString(16).repeat(14);
    expect(() => { padValidation(string) })
        .toThrow(`Invalid padding`);
});
test("teste correct padding 6  (HEX)", () => {
    var string = "971ACD01C9C7ADEACC83257926F490FF" + String.fromCharCode(16).toString(16).repeat(16);
    expect(padValidation(string))
        .toBe(`Correct padding !!`);
});

