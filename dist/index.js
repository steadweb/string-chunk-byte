"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunk(str, maxLengthInBytes) {
    let buf = Buffer.from(str);
    const result = [];
    while (buf.length) {
        let i = 0;
        result.push(buf.subarray(0, maxLengthInBytes).toString());
        i = i + maxLengthInBytes;
        buf = buf.subarray(i);
    }
    return result;
}
exports.default = chunk;
