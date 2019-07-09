"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtype_1 = require("../runtype");
exports.RuntypeName = Symbol('RuntypeName');
function Brand(brand, entity) {
    return runtype_1.create(function (x) { return entity.check(x); }, {
        tag: 'brand',
        brand: brand,
        entity: entity,
    });
}
exports.Brand = Brand;
