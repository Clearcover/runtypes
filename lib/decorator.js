"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var errors_1 = require("./errors");
var CHECKED_PARAMETER_INDICES = Symbol.for('runtypes:checked-parameter-indices');
/**
 * A parameter decorator. Explicitly mark the parameter as checked on every method call in combination with `@checked` method decorator. The number of `@check` params must be the same as the number of provided runtypes into `@checked`.\
 * Usage:
 * ```ts
 * @checked(Runtype1, Runtype3)
 * method(@check p1: Runtype1, p2: number, @check p3: Runtype3) { ... }
 * ```
 */
function check(target, propertyKey, parameterIndex) {
    var existingValidParameterIndices = Reflect.getOwnMetadata(CHECKED_PARAMETER_INDICES, target, propertyKey) || [];
    existingValidParameterIndices.push(parameterIndex);
    Reflect.defineMetadata(CHECKED_PARAMETER_INDICES, existingValidParameterIndices, target, propertyKey);
}
exports.check = check;
/**
 * A method decorator. Takes runtypes as arguments which correspond to the ones of the actual method.
 *
 * Usually, the number of provided runtypes must be _**the same as**_ or _**less than**_ the actual parameters.
 *
 * If you explicitly mark which parameter shall be checked using `@check` parameter decorator, the number of `@check` parameters must be _**the same as**_ the runtypes provided into `@checked`.
 *
 * Usage:
 * ```ts
 * @checked(Runtype1, Runtype2)
 * method1(param1: Static1, param2: Static2, param3: any) {
 *   ...
 * }
 *
 * @checked(Runtype1, Runtype3)
 * method2(@check param1: Static1, param2: any, @check param3: Static3) {
 *   ...
 * }
 * ```
 */
function checked() {
    var runtypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        runtypes[_i] = arguments[_i];
    }
    if (runtypes.length === 0) {
        throw new Error('No runtype provided to `@checked`. Please remove the decorator.');
    }
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        var className = target.name || target.constructor.name;
        var methodId = className +
            (target.name ? '' : '.prototype') +
            (typeof propertyKey === 'string' ? "[\"" + propertyKey + "\"]" : "[" + String(propertyKey) + "]");
        var validParameterIndices = Reflect.getOwnMetadata(CHECKED_PARAMETER_INDICES, target, propertyKey);
        if (validParameterIndices) {
            // if used with `@check` parameter decorator
            if (runtypes.length === validParameterIndices.length) {
                descriptor.value = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    runtypes.forEach(function (type, typeIndex) {
                        var parameterIndex = validParameterIndices[typeIndex];
                        try {
                            type.check(args[parameterIndex]);
                        }
                        catch (err) {
                            throw new errors_1.ValidationError(methodId + ", argument #" + parameterIndex + ": " + err.message);
                        }
                    });
                    return method.apply(this, args);
                };
            }
            else {
                throw new Error('Number of `@checked` runtypes and @valid parameters not matched.');
            }
        }
        else {
            // if used without `@check` parameter decorator
            if (runtypes.length <= method.length) {
                descriptor.value = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    runtypes.forEach(function (type, typeIndex) {
                        try {
                            type.check(args[typeIndex]);
                        }
                        catch (err) {
                            throw new errors_1.ValidationError(methodId + ", argument #" + typeIndex + ": " + err.message);
                        }
                    });
                    return method.apply(this, args);
                };
            }
            else {
                throw new Error('Number of `@checked` runtypes exceeds actual parameter length.');
            }
        }
    };
}
exports.checked = checked;
