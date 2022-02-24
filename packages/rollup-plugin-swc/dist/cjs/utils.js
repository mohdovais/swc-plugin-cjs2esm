"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeHelpers = exports.mergeDeep = void 0;
const path_1 = __importDefault(require("path"));
function excludeHelpers(exclude) {
    const excludeArray = Array.isArray(exclude)
        ? exclude
        : exclude == null
            ? []
            : [exclude];
    excludeArray.push(new RegExp(path_1.default.join("/node_modules", "@swc", "helpers"), "i"));
    return excludeArray;
}
exports.excludeHelpers = excludeHelpers;
function isObject(item) {
    return item != null && typeof item === "object" && !Array.isArray(item);
}
function hasOwnProperty(object, key) {
    return (Object.prototype.hasOwnProperty.call(object, key) && object[key] != null);
}
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!hasOwnProperty(target, key)) {
                    //@ts-ignore
                    target[key] = {};
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                //@ts-ignore
                target[key] = source[key];
            }
        }
    }
    return mergeDeep(target, ...sources);
}
exports.mergeDeep = mergeDeep;