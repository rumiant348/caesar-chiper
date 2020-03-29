const shiftKey = 19;

function encodeString(string, shiftKey) {
    if (!shiftKey) shiftKey = 7;
    return codeString(string, shiftKey);
}

function decodeString(string, shiftKey) {
    if (!shiftKey) shiftKey = -7;
    return codeString(string, shiftKey);
}

function codeString(string, shiftKey) {
    let result = '';
    for (let char of string) {
        result += encoder(char, shiftKey);
    }
    return result;
}

function encoder(char, shiftKey) {
    let charCode = char.charCodeAt(0);
    let newCode = charCode;

    const minUpcase = 65;
    const maxUpcase = 90;

    if (charCode >= minUpcase && charCode <= maxUpcase ) {
        newCode = shift(newCode + shiftKey, minUpcase, maxUpcase)
    }

    const minLowcase = 97;
    const maxLowcase = 122;

    if (charCode >= minLowcase && charCode <= maxLowcase) {
        newCode = shift(newCode + shiftKey, minLowcase, maxLowcase)
    }

   return String.fromCharCode(newCode);
}

function shift(code, min, max) {
    if (code > max) code = (code - max + min) - 1;
    if (code < min) code = max - (min - code) + 1;
    return code;
}

module.exports = {
    encodeString,
    decodeString
}