"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('Decorators', function () {
    describe('@checked', function () {
        describe('parameter length', function () {
            it('works', function () {
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        __decorate([
                            _1.checked(_1.String)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        __decorate([
                            _1.checked(_1.String, _1.String)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        __decorate([
                            _1.checked()
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            if (s === void 0) { s = 'initial'; }
                            if (t === void 0) { t = 'initial'; }
                            return { s: s, t: t };
                        };
                        __decorate([
                            _1.checked(_1.String, _1.String)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', function () {
            it('works', function () {
                var Class = /** @class */ (function () {
                    function Class() {
                    }
                    Class.method1 = function (s) {
                        return s;
                    };
                    Class.method2 = function (s) {
                        return s;
                    };
                    __decorate([
                        _1.checked(_1.String)
                    ], Class, "method1", null);
                    __decorate([
                        _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); }))
                    ], Class, "method2", null);
                    return Class;
                }());
                expect(function () {
                    Class.method1('hello');
                }).not.toThrow();
                expect(function () {
                    Class.method2('hello');
                }).toThrow(/Failed constraint check/);
                expect(function () {
                    Class.method2('world');
                }).not.toThrow();
            });
        });
    });
    describe('@check', function () {
        describe('parameter length', function () {
            it('works', function () {
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        __decorate([
                            _1.checked(_1.String),
                            __param(0, _1.check)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            return { s: s, t: t };
                        };
                        __decorate([
                            _1.checked(_1.String, _1.String),
                            __param(0, _1.check)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            return { s: s, t: t };
                        };
                        __decorate([
                            _1.checked(_1.String),
                            __param(0, _1.check)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', function () {
            it('works', function () {
                var Class = /** @class */ (function () {
                    function Class() {
                    }
                    Class.method1 = function (s) {
                        return s;
                    };
                    Class.method2 = function (s, t) {
                        return { s: s, t: t };
                    };
                    __decorate([
                        _1.checked(_1.String),
                        __param(0, _1.check)
                    ], Class, "method1", null);
                    __decorate([
                        _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); })),
                        __param(1, _1.check)
                    ], Class, "method2", null);
                    return Class;
                }());
                expect(function () {
                    Class.method1('hello');
                }).not.toThrow();
                expect(function () {
                    Class.method2('world', 'hello');
                }).toThrow(/Failed constraint check/);
                expect(function () {
                    Class.method2('hello', 'world');
                }).not.toThrow();
            });
        });
    });
    describe('return value', function () {
        it('works', function () {
            var Class = /** @class */ (function () {
                function Class() {
                }
                Class.method1 = function (s) {
                    return s;
                };
                Class.method2 = function (s, t) {
                    return { s: s, t: t };
                };
                __decorate([
                    _1.checked(_1.String)
                ], Class, "method1", null);
                __decorate([
                    _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); })),
                    __param(1, _1.check)
                ], Class, "method2", null);
                return Class;
            }());
            expect(Class.method1('hello')).toBe('hello');
            expect(Class.method2('hello', 'world')).toEqual({ s: 'hello', t: 'world' });
        });
    });
});
