"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var util_1 = require("../util");
var show_1 = require("../show");
var errors_1 = require("../errors");
/**
 * Construct a runtype for partial records
 */
function Part(fields) {
    return runtype_1.create(function (x) {
        if (x === null || x === undefined) {
            var a = runtype_1.create(function (x) { return x; }, { tag: 'partial', fields: fields });
            throw new errors_1.ValidationError("Expected " + show_1.default(a) + ", but was " + x);
        }
        // tslint:disable-next-line:forin
        for (var key in fields) {
            if (util_1.hasKey(key, x) && x[key] !== undefined) {
                try {
                    fields[key].check(x[key]);
                }
                catch (_a) {
                    var message = _a.message, nestedKey = _a.key;
                    throw new errors_1.ValidationError(message, nestedKey ? key + "." + nestedKey : key);
                }
            }
        }
        return x;
    }, { tag: 'partial', fields: fields });
}
exports.Part = Part;
exports.Partial = Part;
