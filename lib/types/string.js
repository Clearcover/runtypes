"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Validates that a value is a string.
 */
exports.String = runtype_1.create(function (x) {
    if (typeof x !== 'string')
        throw new errors_1.ValidationError("Expected string, but was " + (x === null || x === undefined ? x : typeof x));
    return x;
}, { tag: 'string' });
