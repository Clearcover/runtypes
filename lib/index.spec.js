"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var errors_1 = require("./errors");
var boolTuple = index_1.Tuple(index_1.Boolean, index_1.Boolean, index_1.Boolean);
var record1 = index_1.Record({ Boolean: index_1.Boolean, Number: index_1.Number });
var union1 = index_1.Union(index_1.Literal(3), index_1.String, boolTuple, record1);
var Person = index_1.Lazy(function () { return index_1.Record({ name: index_1.String, likes: index_1.Array(Person) }); });
var SomeClass = /** @class */ (function () {
    function SomeClass(n) {
        this.n = n;
    }
    return SomeClass;
}());
var SomeOtherClass = /** @class */ (function () {
    function SomeOtherClass(n) {
        this.n = n;
    }
    return SomeOtherClass;
}());
var SOMECLASS_TAG = 'I am a SomeClass instance (any version)';
var SomeClassV1 = /** @class */ (function () {
    function SomeClassV1(n) {
        this.n = n;
        this._someClassTag = SOMECLASS_TAG;
    }
    SomeClassV1.isSomeClass = function (o) { return o._someClassTag === SOMECLASS_TAG; };
    return SomeClassV1;
}());
var SomeClassV2 = /** @class */ (function () {
    function SomeClassV2(n) {
        this.n = n;
        this._someClassTag = SOMECLASS_TAG;
    }
    SomeClassV2.isSomeClass = function (o) { return o._someClassTag === SOMECLASS_TAG; };
    return SomeClassV2;
}());
var runtypes = {
    Unknown: index_1.Unknown,
    Never: index_1.Never,
    Undefined: index_1.Undefined,
    Null: index_1.Null,
    Empty: index_1.Record({}),
    Void: index_1.Void,
    Boolean: index_1.Boolean,
    true: index_1.Literal(true),
    false: index_1.Literal(false),
    Number: index_1.Number,
    3: index_1.Literal(3),
    42: index_1.Literal(42),
    brandedNumber: index_1.Number.withBrand('number'),
    String: index_1.String,
    'hello world': index_1.Literal('hello world'),
    Sym: index_1.Symbol,
    symbolArray: index_1.Array(index_1.Symbol),
    boolArray: index_1.Array(index_1.Boolean),
    boolTuple: boolTuple,
    record1: record1,
    union1: union1,
    Partial: index_1.Partial({ foo: index_1.String }).And(index_1.Record({ Boolean: index_1.Boolean })),
    Function: index_1.Function,
    Person: Person,
    MoreThanThree: index_1.Number.withConstraint(function (n) { return n > 3; }),
    MoreThanThreeWithMessage: index_1.Number.withConstraint(function (n) { return n > 3 || n + " is not greater than 3"; }),
    ArrayString: index_1.Array(index_1.String),
    ArrayNumber: index_1.Array(index_1.Number),
    ArrayPerson: index_1.Array(Person),
    CustomArray: index_1.Array(index_1.Number).withConstraint(function (x) { return x.length > 3; }, { args: { tag: 'length', min: 3 } }),
    CustomArrayWithMessage: index_1.Array(index_1.Number).withConstraint(function (x) { return x.length > 3 || "Length array is not greater 3"; }, { args: { tag: 'length', min: 3 } }),
    Dictionary: index_1.Dictionary(index_1.String),
    NumberDictionary: index_1.Dictionary(index_1.String, 'number'),
    DictionaryOfArrays: index_1.Dictionary(index_1.Array(index_1.Boolean)),
    InstanceOfSomeClass: index_1.InstanceOf(SomeClass),
    InstanceOfSomeOtherClass: index_1.InstanceOf(SomeOtherClass),
    CustomGuardConstraint: index_1.Unknown.withGuard(SomeClassV2.isSomeClass),
    CustomGuardType: index_1.Guard(SomeClassV2.isSomeClass),
    ChangeType: index_1.Unknown.withConstraint(SomeClassV2.isSomeClass),
    ChangeTypeAndName: index_1.Unknown.withConstraint(function (o) { return o._someClassTag === SOMECLASS_TAG; }, {
        name: 'SomeClass',
    }),
    GuardChangeTypeAndName: index_1.Guard(function (o) { return o._someClassTag === SOMECLASS_TAG; }, {
        name: 'SomeClass',
    }),
    DictionaryOfArraysOfSomeClass: index_1.Dictionary(index_1.Array(index_1.InstanceOf(SomeClass))),
    OptionalKey: index_1.Record({ foo: index_1.String, bar: index_1.Union(index_1.Number, index_1.Undefined) }),
    ReadonlyNumberArray: index_1.Array(index_1.Number).asReadonly(),
    ReadonlyRecord: index_1.Record({ foo: index_1.Number, bar: index_1.String }).asReadonly(),
};
var runtypeNames = Object.keys(runtypes);
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}()); // Should not be recognized as a Dictionary
var testValues = [
    { value: undefined, passes: ['Undefined', 'Void'] },
    { value: null, passes: ['Null', 'Void'] },
    { value: true, passes: ['Boolean', 'true'] },
    { value: false, passes: ['Boolean', 'false'] },
    { value: 3, passes: ['Number', 'brandedNumber', 3, 'union1'] },
    {
        value: 42,
        passes: ['Number', 'brandedNumber', 42, 'MoreThanThree', 'MoreThanThreeWithMessage'],
    },
    { value: 'hello world', passes: ['String', 'hello world', 'union1'] },
    { value: [Symbol('0'), Symbol(42), Symbol()], passes: ['symbolArray'] },
    { value: Symbol.for('runtypes'), passes: ['Sym'] },
    { value: [true, false, true], passes: ['boolArray', 'boolTuple', 'union1'] },
    { value: { Boolean: true, Number: 3 }, passes: ['record1', 'union1', 'Partial'] },
    { value: { Boolean: true }, passes: ['Partial'] },
    { value: { Boolean: true, foo: undefined }, passes: ['Partial'] },
    { value: { Boolean: true, foo: 'hello' }, passes: ['Partial', 'OptionalKey'] },
    { value: { Boolean: true, foo: 5 }, passes: [] },
    { value: function (x, y) { return x + y.length; }, passes: ['Function'] },
    { value: { name: undefined, likes: [] }, passes: [] },
    { value: { name: 'Jimmy', likes: [{ name: undefined, likes: [] }] }, passes: [] },
    { value: { name: 'Jimmy', likes: [{ name: 'Peter', likes: [] }] }, passes: ['Person'] },
    { value: { a: '1', b: '2' }, passes: ['Dictionary'] },
    { value: ['1', '2'], passes: ['ArrayString', 'NumberDictionary'] },
    { value: ['1', 2], passes: [] },
    { value: [{ name: 'Jimmy', likes: [{ name: 'Peter', likes: [] }] }], passes: ['ArrayPerson'] },
    { value: [{ name: null, likes: [] }], passes: [] },
    { value: { 1: '1', 2: '2' }, passes: ['Dictionary', 'NumberDictionary'] },
    { value: { a: [], b: [true, false] }, passes: ['DictionaryOfArrays'] },
    { value: new Foo(), passes: [] },
    { value: [1, 2, 4], passes: ['ArrayNumber', 'ReadonlyNumberArray'] },
    { value: { Boolean: true, Number: '5' }, passes: ['Partial'] },
    {
        value: [1, 2, 3, 4],
        passes: ['ArrayNumber', 'ReadonlyNumberArray', 'CustomArray', 'CustomArrayWithMessage'],
    },
    {
        value: new SomeClassV1(42),
        passes: [
            'CustomGuardType',
            'CustomGuardConstraint',
            'ChangeType',
            'ChangeTypeAndName',
            'GuardChangeTypeAndName',
        ],
    },
    {
        value: new SomeClassV2(42),
        passes: [
            'CustomGuardType',
            'CustomGuardConstraint',
            'ChangeType',
            'ChangeTypeAndName',
            'GuardChangeTypeAndName',
        ],
    },
    { value: { xxx: [new SomeClass(55)] }, passes: ['DictionaryOfArraysOfSomeClass'] },
    { value: { foo: 'hello' }, passes: ['OptionalKey', 'Dictionary'] },
    { value: { foo: 'hello', bar: undefined }, passes: ['OptionalKey'] },
    { value: { foo: 4, bar: 'baz' }, passes: ['ReadonlyRecord'] },
];
var _loop_1 = function (value, passes) {
    var valueName = value === undefined ? 'undefined' : JSON.stringify(value);
    describe(valueName, function () {
        var shouldPass = {};
        shouldPass.Unknown = true;
        shouldPass.Void = true;
        if (value !== undefined && value !== null)
            shouldPass.Empty = true;
        for (var _i = 0, passes_1 = passes; _i < passes_1.length; _i++) {
            var name_1 = passes_1[_i];
            shouldPass[name_1] = true;
        }
        var _loop_2 = function (name_2) {
            if (shouldPass[name_2]) {
                it(" : " + name_2, function () { return assertAccepts(value, runtypes[name_2]); });
            }
            else {
                it("~: " + name_2, function () { return assertRejects(value, runtypes[name_2]); });
            }
        };
        for (var _a = 0, runtypeNames_1 = runtypeNames; _a < runtypeNames_1.length; _a++) {
            var name_2 = runtypeNames_1[_a];
            _loop_2(name_2);
        }
    });
};
for (var _i = 0, testValues_1 = testValues; _i < testValues_1.length; _i++) {
    var _a = testValues_1[_i], value = _a.value, passes = _a.passes;
    _loop_1(value, passes);
}
describe('contracts', function () {
    it('0 args', function () {
        var f = function () { return 3; };
        expect(index_1.Contract(index_1.Number).enforce(f)()).toBe(3);
        try {
            index_1.Contract(index_1.String).enforce(f)();
            fail('contract was violated but no exception was thrown');
        }
        catch (e) {
            /* success */
        }
    });
    it('1 arg', function () {
        var f = function (x) { return x.length; };
        expect(index_1.Contract(index_1.String, index_1.Number).enforce(f)('hel')).toBe(3);
        try {
            index_1.Contract(index_1.String, index_1.Number).enforce(f)(3);
            fail('contract was violated but no exception was thrown');
            index_1.Contract(index_1.String, index_1.String).enforce(f)('hi');
            fail('contract was violated but no exception was thrown');
        }
        catch (e) {
            /* success */
        }
    });
    it('2 args', function () {
        var f = function (x, y) { return (y ? x.length : 4); };
        expect(index_1.Contract(index_1.String, index_1.Boolean, index_1.Number).enforce(f)('hello', false)).toBe(4);
        try {
            index_1.Contract(index_1.String, index_1.Boolean, index_1.Number).enforce(f)('hello');
            fail('contract was violated but no exception was thrown');
            index_1.Contract(index_1.String, index_1.Boolean, index_1.Number).enforce(f)('hello', 3);
            fail('contract was violated but no exception was thrown');
        }
        catch (e) {
            /* success */
        }
    });
});
describe('check errors', function () {
    it('tuple type', function () {
        assertThrows([false, '0', true], index_1.Tuple(index_1.Number, index_1.String, index_1.Boolean), 'Expected number, but was boolean', '[0]');
    });
    it('tuple length', function () {
        assertThrows([0, '0'], index_1.Tuple(index_1.Number, index_1.String, index_1.Boolean), 'Expected an array of length 3, but was 2');
    });
    it('tuple nested', function () {
        assertThrows([0, { name: 0 }], index_1.Tuple(index_1.Number, index_1.Record({ name: index_1.String })), 'Expected string, but was number', '[1].name');
    });
    it('array', function () {
        assertThrows([0, 2, 'test'], index_1.Array(index_1.Number), 'Expected number, but was string', '[2]');
    });
    it('array nested', function () {
        assertThrows([{ name: 'Foo' }, { name: false }], index_1.Array(index_1.Record({ name: index_1.String })), 'Expected string, but was boolean', '[1].name');
    });
    it('array null', function () {
        assertThrows([{ name: 'Foo' }, null], index_1.Array(index_1.Record({ name: index_1.String })), 'Expected { name: string; }, but was null', '[1]');
    });
    it('readonly array', function () {
        assertThrows([0, 2, 'test'], index_1.Array(index_1.Number).asReadonly(), 'Expected number, but was string', '[2]');
    });
    it('readonly array nested', function () {
        assertThrows([{ name: 'Foo' }, { name: false }], index_1.Array(index_1.Record({ name: index_1.String })).asReadonly(), 'Expected string, but was boolean', '[1].name');
    });
    it('readonly array null', function () {
        assertThrows([{ name: 'Foo' }, null], index_1.Array(index_1.Record({ name: index_1.String })).asReadonly(), 'Expected { name: string; }, but was null', '[1]');
    });
    it('dictionary', function () {
        assertThrows(null, index_1.Dictionary(index_1.String), 'Expected { [_: string]: string }, but was null');
    });
    it('dictionary invalid type', function () {
        assertThrows(undefined, index_1.Dictionary(index_1.Record({ name: index_1.String })), 'Expected { [_: string]: { name: string; } }, but was undefined');
        assertThrows(1, index_1.Dictionary(index_1.Record({ name: index_1.String })), 'Expected { [_: string]: { name: string; } }, but was number');
    });
    it('dictionary complex', function () {
        assertThrows({ foo: { name: false } }, index_1.Dictionary(index_1.Record({ name: index_1.String })), 'Expected string, but was boolean', 'foo.name');
    });
    it('string dictionary', function () {
        assertThrows({ foo: 'bar', test: true }, index_1.Dictionary(index_1.String), 'Expected string, but was boolean', 'test');
    });
    it('number dictionary', function () {
        assertThrows({ 1: 'bar', 2: 20 }, index_1.Dictionary(index_1.String, 'number'), 'Expected string, but was number', '2');
    });
    it('record', function () {
        assertThrows({ name: 'Jack', age: '10' }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
        }), 'Expected number, but was string', 'age');
    });
    it('record missing keys', function () {
        assertThrows({ name: 'Jack' }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
        }), 'Expected number, but was undefined', 'age');
    });
    it('record complex', function () {
        assertThrows({ name: 'Jack', age: 10, likes: [{ title: false }] }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
            likes: index_1.Array(index_1.Record({ title: index_1.String })),
        }), 'Expected string, but was boolean', 'likes.[0].title');
    });
    it('readonly record', function () {
        assertThrows({ name: 'Jack', age: '10' }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
        }).asReadonly(), 'Expected number, but was string', 'age');
    });
    it('readonly record missing keys', function () {
        assertThrows({ name: 'Jack' }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
        }).asReadonly(), 'Expected number, but was undefined', 'age');
    });
    it('readonly record complex', function () {
        assertThrows({ name: 'Jack', age: 10, likes: [{ title: false }] }, index_1.Record({
            name: index_1.String,
            age: index_1.Number,
            likes: index_1.Array(index_1.Record({ title: index_1.String }).asReadonly()),
        }).asReadonly(), 'Expected string, but was boolean', 'likes.[0].title');
    });
    it('partial', function () {
        assertThrows({ name: 'Jack', age: null }, index_1.Partial({
            name: index_1.String,
            age: index_1.Number,
        }), 'Expected number, but was null', 'age');
    });
    it('partial complex', function () {
        assertThrows({ name: 'Jack', likes: [{ title: 2 }] }, index_1.Partial({
            name: index_1.String,
            age: index_1.Number,
            likes: index_1.Array(index_1.Record({ title: index_1.String })),
        }), 'Expected string, but was number', 'likes.[0].title');
    });
    it('constraint standard message', function () {
        assertThrows(new SomeClass(1), index_1.Unknown.withConstraint(function (o) { return o.n > 3; }, {
            name: 'SomeClass',
        }), 'Failed SomeClass check');
    });
    it('constraint custom message', function () {
        assertThrows(new SomeClass(1), index_1.Unknown.withConstraint(function (o) { return (o.n > 3 ? true : 'n must be 3+'); }, {
            name: 'SomeClass',
        }), 'n must be 3+');
    });
    it('union', function () {
        assertThrows(false, index_1.Union(index_1.Number, index_1.String), 'Expected number | string, but was boolean');
    });
});
describe('reflection', function () {
    var X = index_1.Literal('x');
    var Y = index_1.Literal('y');
    it('unknown', function () {
        expectLiteralField(index_1.Unknown, 'tag', 'unknown');
    });
    it('never', function () {
        expectLiteralField(index_1.Never, 'tag', 'never');
    });
    it('void', function () {
        expectLiteralField(index_1.Void, 'tag', 'unknown');
    });
    it('boolean', function () {
        expectLiteralField(index_1.Boolean, 'tag', 'boolean');
    });
    it('number', function () {
        expectLiteralField(index_1.Number, 'tag', 'number');
    });
    it('string', function () {
        expectLiteralField(index_1.String, 'tag', 'string');
    });
    it('symbol', function () {
        expectLiteralField(index_1.Symbol, 'tag', 'symbol');
    });
    it('literal', function () {
        expectLiteralField(X, 'tag', 'literal');
        expectLiteralField(X, 'value', 'x');
    });
    it('array', function () {
        expectLiteralField(index_1.Array(X), 'tag', 'array');
        expectLiteralField(index_1.Array(X).element, 'tag', 'literal');
        expectLiteralField(index_1.Array(X).element, 'value', 'x');
        expectLiteralField(index_1.Array(X), 'isReadonly', false);
    });
    it('array (asReadonly)', function () {
        expectLiteralField(index_1.Array(X).asReadonly(), 'tag', 'array');
        expectLiteralField(index_1.Array(X).asReadonly().element, 'tag', 'literal');
        expectLiteralField(index_1.Array(X).asReadonly().element, 'value', 'x');
        expectLiteralField(index_1.Array(X).asReadonly(), 'isReadonly', true);
    });
    it('tuple', function () {
        expectLiteralField(index_1.Tuple(X, X), 'tag', 'tuple');
        expect(index_1.Tuple(X, X).components.map(function (C) { return C.tag; })).toEqual(['literal', 'literal']);
        expect(index_1.Tuple(X, X).components.map(function (C) { return C.value; })).toEqual(['x', 'x']);
    });
    it('string dictionary', function () {
        var Rec = index_1.Dictionary(index_1.Unknown);
        expectLiteralField(Rec, 'tag', 'dictionary');
        expectLiteralField(Rec, 'key', 'string');
    });
    it('number dictionary', function () {
        var Rec = index_1.Dictionary(index_1.Unknown, 'number');
        expectLiteralField(Rec, 'tag', 'dictionary');
        expectLiteralField(Rec, 'key', 'number');
    });
    it('record', function () {
        var Rec = index_1.Record({ x: index_1.Number, y: index_1.Literal(3) });
        expectLiteralField(Rec, 'tag', 'record');
        expectLiteralField(Rec.fields.x, 'tag', 'number');
        expectLiteralField(Rec.fields.y, 'tag', 'literal');
        expectLiteralField(Rec.fields.y, 'value', 3);
        expectLiteralField(Rec, 'isReadonly', false);
    });
    it('record (asReadonly)', function () {
        var Rec = index_1.Record({ x: index_1.Number, y: index_1.Literal(3) }).asReadonly();
        expectLiteralField(Rec, 'tag', 'record');
        expectLiteralField(Rec.fields.x, 'tag', 'number');
        expectLiteralField(Rec.fields.y, 'tag', 'literal');
        expectLiteralField(Rec.fields.y, 'value', 3);
        expectLiteralField(Rec, 'isReadonly', true);
    });
    it('partial', function () {
        var Opt = index_1.Partial({ x: index_1.Number, y: index_1.Literal(3) });
        expectLiteralField(Opt, 'tag', 'partial');
        expectLiteralField(Opt.fields.x, 'tag', 'number');
        expectLiteralField(Opt.fields.y, 'tag', 'literal');
        expectLiteralField(Opt.fields.y, 'value', 3);
    });
    it('union', function () {
        expectLiteralField(index_1.Union(X, Y), 'tag', 'union');
        expectLiteralField(index_1.Union(X, Y), 'tag', 'union');
        expect(index_1.Union(X, Y).alternatives.map(function (A) { return A.tag; })).toEqual(['literal', 'literal']);
        expect(index_1.Union(X, Y).alternatives.map(function (A) { return A.value; })).toEqual(['x', 'y']);
    });
    it('intersect', function () {
        expectLiteralField(index_1.Intersect(X, Y), 'tag', 'intersect');
        expectLiteralField(index_1.Intersect(X, Y), 'tag', 'intersect');
        expect(index_1.Intersect(X, Y).intersectees.map(function (A) { return A.tag; })).toEqual(['literal', 'literal']);
        expect(index_1.Intersect(X, Y).intersectees.map(function (A) { return A.value; })).toEqual(['x', 'y']);
    });
    it('function', function () {
        expectLiteralField(index_1.Function, 'tag', 'function');
    });
    it('lazy', function () {
        var L = index_1.Lazy(function () { return X; });
        expectLiteralField(L, 'tag', 'literal');
        expectLiteralField(L, 'value', 'x');
    });
    it('constraint', function () {
        var C = index_1.Number.withConstraint(function (n) { return n > 0; }, { name: 'PositiveNumber' });
        expectLiteralField(C, 'tag', 'constraint');
        expectLiteralField(C.underlying, 'tag', 'number');
        expectLiteralField(C, 'name', 'PositiveNumber');
    });
    it('instanceof', function () {
        var Test = /** @class */ (function () {
            function Test() {
            }
            return Test;
        }());
        expectLiteralField(index_1.InstanceOf(Test), 'tag', 'instanceof');
        expectLiteralField(index_1.Dictionary(index_1.Array(index_1.InstanceOf(Test))), 'tag', 'dictionary');
    });
    it('brand', function () {
        var C = index_1.Number.withBrand('someNumber');
        expectLiteralField(C, 'tag', 'brand');
        expectLiteralField(C.entity, 'tag', 'number');
    });
});
describe('change static type with Constraint', function () {
    var test = function (value) {
        var C = index_1.Unknown.withConstraint(SomeClassV2.isSomeClass, {
            name: 'SomeClass',
        });
        if (C.guard(value)) {
            return value;
        }
        else {
            return new SomeClassV2(3);
        }
    };
    it('change static type', function () {
        var value = new SomeClassV1(42);
        var result = test(value);
        // confirm that it's really a SomeClassV1, even though it's type-cast to SomeClassV2
        expect(result instanceof SomeClassV1).toBe(true);
        expect(result.n).toBe(42);
    });
});
// Static tests of reflection
(function (X) {
    var check = function (X) { return X.check({}); };
    switch (X.tag) {
        case 'unknown':
            check(X);
            break;
        case 'never':
            check(X);
            break;
        case 'boolean':
            check(X);
            break;
        case 'number':
            check(X);
            break;
        case 'string':
            check(X);
            break;
        case 'symbol':
            check(X);
            break;
        case 'literal':
            check(X);
            break;
        case 'array':
            check(X);
            break;
        case 'record':
            check(X);
            break;
        case 'partial':
            check(X);
            break;
        case 'tuple':
            check(X);
            break;
        case 'union':
            check(X);
            break;
        case 'intersect':
            check(X);
            break;
        case 'function':
            check(X);
            break;
        case 'constraint':
            check(X);
            break;
        case 'instanceof':
            check(X);
            break;
        case 'brand':
            check(X);
            break;
    }
    return X;
});
function expectLiteralField(o, k, v) {
    expect(o[k]).toBe(v);
}
function assertAccepts(value, runtype) {
    var result = runtype.validate(value);
    if (result.success === false)
        fail(result.message);
}
function assertRejects(value, runtype) {
    var result = runtype.validate(value);
    if (result.success === true)
        fail('value passed validation even though it was not expected to');
}
function assertThrows(value, runtype, error, key) {
    try {
        runtype.check(value);
        fail('value passed validation even though it was not expected to');
    }
    catch (exception) {
        var errorMessage = exception.message, errorKey = exception.key;
        expect(exception).toBeInstanceOf(errors_1.ValidationError);
        expect(errorMessage).toBe(error);
        expect(errorKey).toBe(key);
    }
}
