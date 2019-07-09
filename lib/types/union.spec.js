"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ThreeOrString = __1.Union(__1.Literal(3), __1.String);
describe('union', function () {
    describe('match', function () {
        it('works with exhaustive cases', function () {
            var match = ThreeOrString.match(function (three) { return three + 5; }, function (str) { return str.length * 4; });
            expect(match(3)).toBe(8);
            expect(match('hello')).toBe(20);
        });
    });
});
