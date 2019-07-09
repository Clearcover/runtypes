"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var util_1 = require("../util");
var show_1 = require("../show");
var errors_1 = require("../errors");
/**
 * Construct a record runtype from runtypes for its values.
 */
function InternalRecord(fields, isReadonly) {
    return withExtraModifierFuncs(runtype_1.create(function (x) {
        if (x === null || x === undefined) {
            var a = runtype_1.create(function (x) { return x; }, { tag: 'record', fields: fields });
            throw new errors_1.ValidationError("Expected " + show_1.default(a) + ", but was " + x);
        }
        // tslint:disable-next-line:forin
        for (var key in fields) {
            try {
                fields[key].check(util_1.hasKey(key, x) ? x[key] : undefined);
            }
            catch (_a) {
                var nestedKey = _a.key, message = _a.message;
                throw new errors_1.ValidationError(message, nestedKey ? key + "." + nestedKey : key);
            }
        }
        return x;
    }, { tag: 'record', isReadonly: isReadonly, fields: fields }));
}
exports.InternalRecord = InternalRecord;
function Record(fields) {
    return InternalRecord(fields, false);
}
exports.Record = Record;
function withExtraModifierFuncs(A) {
    A.asReadonly = asReadonly;
    return A;
    function asReadonly() {
        return InternalRecord(A.fields, true);
    }
}
