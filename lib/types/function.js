"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Construct a runtype for functions.
 */
exports.Function = runtype_1.create(function (x) {
    if (typeof x !== 'function')
        throw new errors_1.ValidationError("Expected function, but was " + typeof x);
    return x;
}, { tag: 'function' });
