const pkcs = require("./PKCS");
test("teste 1", () => {
    expect(pkcs("YELLOW SUBMARINE", 20))
        .toBe(`YELLOW SUBMARINE${"04".repeat(4)}`);
});
test("teste 2", () => {
    expect(pkcs("F14ADBDA019D6DB7EFD91546E3FF84449BCB", 16, "Hex"))
        .toBe("F14ADBDA019D6DB7EFD91546E3FF84449BCB0e0e0e0e0e0e0e0e0e0e0e0e0e0e");
});
test("teste 3", () => {
    expect(pkcs("YELLOW SUBMARIN"))
        .toBe(`YELLOW SUBMARIN${"01".repeat(1)}`);
});
test("teste 4", () => {
    expect(pkcs("971ACD01C9C7ADEACC83257926F490FF", 16, "Hex"))
        .toBe(`971ACD01C9C7ADEACC83257926F490FF10101010101010101010101010101010`);
});
test("teste 5", () => {
    expect(pkcs("971ACD01C9C7ADEACC83257926F490FF", 16, "hex"))
        .toBe(`971ACD01C9C7ADEACC83257926F490FF10101010101010101010101010101010`);
});
test("teste 6", () => {
    expect(() => pkcs("971ACD01C9C7ADEACC83257926F490FF", 16, "UTF-8"))
        .toThrow(new Error('Invalid encode'))
});
