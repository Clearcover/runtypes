"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Validates that a value is a symbol.
 */
var Sym = runtype_1.create(function (x) {
    if (typeof x !== 'symbol')
        throw new errors_1.ValidationError("Expected symbol, but was " + (x === null || x === undefined ? x : typeof x));
    return x;
}, { tag: 'symbol' });
exports.Symbol = Sym;
