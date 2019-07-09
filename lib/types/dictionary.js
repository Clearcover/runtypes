"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var show_1 = require("../show");
var errors_1 = require("../errors");
function Dictionary(value, key) {
    if (key === void 0) { key = 'string'; }
    return runtype_1.create(function (x) {
        if (x === null || x === undefined) {
            var a = runtype_1.create(x, { tag: 'dictionary', key: key, value: value });
            throw new errors_1.ValidationError("Expected " + show_1.default(a) + ", but was " + x);
        }
        if (typeof x !== 'object') {
            var a = runtype_1.create(x, { tag: 'dictionary', key: key, value: value });
            throw new errors_1.ValidationError("Expected " + show_1.default(a.reflect) + ", but was " + typeof x);
        }
        if (Object.getPrototypeOf(x) !== Object.prototype) {
            if (!Array.isArray(x)) {
                var a = runtype_1.create(x, { tag: 'dictionary', key: key, value: value });
                throw new errors_1.ValidationError("Expected " + show_1.default(a.reflect) + ", but was " + Object.getPrototypeOf(x));
            }
            else if (key === 'string')
                throw new errors_1.ValidationError("Expected dictionary, but was array");
        }
        for (var k in x) {
            // Object keys are unknown strings
            if (key === 'number') {
                if (isNaN(+k))
                    throw new errors_1.ValidationError("Expected dictionary key to be a number, but was string");
            }
            try {
                value.check(x[k]);
            }
            catch (_a) {
                var nestedKey = _a.key, message = _a.message;
                throw new errors_1.ValidationError(message, nestedKey ? k + "." + nestedKey : k);
            }
        }
        return x;
    }, { tag: 'dictionary', key: key, value: value });
}
exports.Dictionary = Dictionary;
