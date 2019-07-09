"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var show_1 = require("../show");
var errors_1 = require("../errors");
function Union() {
    var alternatives = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        alternatives[_i] = arguments[_i];
    }
    var match = function () {
        var cases = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cases[_i] = arguments[_i];
        }
        return function (x) {
            for (var i = 0; i < alternatives.length; i++) {
                if (alternatives[i].guard(x)) {
                    return cases[i](x);
                }
            }
        };
    };
    return runtype_1.create(function (x) {
        for (var _i = 0, alternatives_1 = alternatives; _i < alternatives_1.length; _i++) {
            var guard = alternatives_1[_i].guard;
            if (guard(x))
                return x;
        }
        var a = runtype_1.create(x, { tag: 'union', alternatives: alternatives });
        throw new errors_1.ValidationError("Expected " + show_1.default(a) + ", but was " + typeof x);
    }, { tag: 'union', alternatives: alternatives, match: match });
}
exports.Union = Union;
