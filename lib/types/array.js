"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Construct an array runtype from a runtype for its elements.
 */
function InternalArr(element, isReadonly) {
    return withExtraModifierFuncs(runtype_1.create(function (xs) {
        if (!Array.isArray(xs))
            throw new errors_1.ValidationError("Expected array, but was " + typeof xs);
        for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
            var x = xs_1[_i];
            try {
                element.check(x);
            }
            catch (_a) {
                var message = _a.message, key = _a.key;
                throw new errors_1.ValidationError(message, key ? "[" + xs.indexOf(x) + "]." + key : "[" + xs.indexOf(x) + "]");
            }
        }
        return xs;
    }, { tag: 'array', isReadonly: isReadonly, element: element }));
}
function Arr(element) {
    return InternalArr(element, false);
}
exports.Array = Arr;
function withExtraModifierFuncs(A) {
    A.asReadonly = asReadonly;
    return A;
    function asReadonly() {
        return InternalArr(A.element, true);
    }
}
