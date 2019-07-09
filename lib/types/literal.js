"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Construct a runtype for a type literal.
 */
function Literal(value) {
    return runtype_1.create(function (x) {
        if (x !== value)
            throw new errors_1.ValidationError("Expected literal '" + value + "', but was '" + x + "'");
        return x;
    }, { tag: 'literal', value: value });
}
exports.Literal = Literal;
/**
 * An alias for Literal(undefined).
 */
exports.Undefined = Literal(undefined);
/**
 * An alias for Literal(null).
 */
exports.Null = Literal(null);
