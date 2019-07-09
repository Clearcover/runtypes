"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var array_1 = require("./array");
var errors_1 = require("../errors");
var unknown_1 = require("./unknown");
function Tuple() {
    var components = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        components[_i] = arguments[_i];
    }
    return runtype_1.create(function (x) {
        var xs;
        try {
            xs = array_1.Array(unknown_1.Unknown).check(x);
        }
        catch (_a) {
            var key = _a.key, message = _a.message;
            throw new errors_1.ValidationError("Expected tuple to be an array:\u00A0" + message, key);
        }
        if (xs.length < components.length)
            throw new errors_1.ValidationError("Expected an array of length " + components.length + ", but was " + xs.length);
        for (var i = 0; i < components.length; i++) {
            try {
                components[i].check(xs[i]);
            }
            catch (_b) {
                var message = _b.message, nestedKey = _b.key;
                throw new errors_1.ValidationError(message, nestedKey ? "[" + i + "]." + nestedKey : "[" + i + "]");
            }
        }
        return x;
    }, { tag: 'tuple', components: components });
}
exports.Tuple = Tuple;
