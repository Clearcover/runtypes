"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var string_1 = require("./string");
var errors_1 = require("../errors");
var unknown_1 = require("./unknown");
function Constraint(underlying, constraint, options) {
    return runtype_1.create(function (x) {
        var name = options && options.name;
        var typed = underlying.check(x);
        var result = constraint(typed);
        if (string_1.String.guard(result))
            throw new errors_1.ValidationError(result);
        else if (!result)
            throw new errors_1.ValidationError("Failed " + (name || 'constraint') + " check");
        return typed;
    }, {
        tag: 'constraint',
        underlying: underlying,
        constraint: constraint,
        name: options && options.name,
        args: options && options.args,
    });
}
exports.Constraint = Constraint;
exports.Guard = function (guard, options) { return unknown_1.Unknown.withGuard(guard, options); };
