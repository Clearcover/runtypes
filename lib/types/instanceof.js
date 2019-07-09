"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
var errors_1 = require("../errors");
function InstanceOf(ctor) {
    return runtype_1.create(function (x) {
        if (!(x instanceof ctor)) {
            throw new errors_1.ValidationError("Expected " + ctor.name + ", but was " + typeof x);
        }
        return x;
    }, { tag: 'instanceof', ctor: ctor });
}
exports.InstanceOf = InstanceOf;
