"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Validates that a value is a number.
 */
exports.Number = runtype_1.create(function (x) {
    if (typeof x !== 'number')
        throw new errors_1.ValidationError("Expected number, but was " + (x === null || x === undefined ? x : typeof x));
    return x;
}, { tag: 'number' });
