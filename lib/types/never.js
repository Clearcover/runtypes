"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
/**
 * Validates nothing (unknown fails).
 */
exports.Never = runtype_1.create(function (x) {
    throw new errors_1.ValidationError("Expected nothing, but was " + x);
}, { tag: 'never' });
