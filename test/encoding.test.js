const { encodeString, decodeString } = require('../src/encoding');

test('special symbols encode', () => {
    const result = encodeString('This is secret. Message about "_" symbol!');
    expect(result).toEqual('Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!');
});

test('special symbols decode', () => {
    const result = decodeString('Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!');
    expect(result).toEqual('This is secret. Message about "_" symbol!');
});

test('letter encode', () => {
    const result = encodeString('TS');
    expect(result).toEqual('AZ');
});

test('text is encoded', () => {
    const result = encodeString('This is secret.');
    expect(result).toEqual('Aopz pz zljyla.');
});

test('letter decode', () => {
    const result = decodeString('o');
    expect(result).toEqual('h');
});

test('text is decoded', () => {
    const result = decodeString('Aopz pz zljyla.');
    expect(result).toEqual('This is secret.');
});

test('alphabet encode test', () => {
    const result = encodeString('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1);
    expect(result).toEqual('BCDEFGHIJKLMNOPQRSTUVWXYZA');
});

test('alphabet decode test', () => {
    const result = decodeString('ABCDEFGHIJKLMNOPQRSTUVWXYZ', -1);
    expect(result).toEqual('ZABCDEFGHIJKLMNOPQRSTUVWXY');
});

test('A test', () => {
    const result = encodeString('A', 1);
    expect(result).toEqual('B');
});

test('Alpahbet 26 test', () => {
    const result = encodeString('ABCDEFGHIJKLMNOPQRSTUVWXYZ', -26);
    expect(result).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
});
