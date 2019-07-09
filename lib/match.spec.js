"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('match', function () {
    it('works', function () {
        var f = _1.match([_1.Literal(42), function (fortyTwo) { return fortyTwo / 2; }], [_1.Number, function (n) { return n + 9; }], [_1.String, function (s) { return s.length * 2; }]);
        expect(f(42)).toBe(21);
        expect(f(16)).toBe(25);
        expect(f('yooo')).toBe(8);
        expect(function () { return f(true); }).toThrow('No alternatives were matched');
    });
});
