"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = exports.default = void 0;

var _uniqueFactory = _interopRequireWildcard(require("./uniqueFactory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ctor = () => {};

function getCurrent() {
  return (0, _uniqueFactory.genStrUniqueId)();
}

const getNext = () => {
  let i__ = 0;
  return () => ++i__;
};

function userGenerateStrUniqueId({
  prefix,
  suffix
}) {
  return `${prefix}f3av3#$${getNext()}*&&*2fd${suffix}`;
}

function factory({
  prefix,
  suffix
}) {
  return {
    getCurrent,
    onDispose: ctor,
    userGenerateStrUniqueId
  };
}

const uuidByClosureFactory = (0, _uniqueFactory.default)(factory);
var _default = uuidByClosureFactory;
exports.default = _default;
const uuid = (0, _uniqueFactory.buildDefaultUuid)(uuidByClosureFactory);
exports.uuid = uuid;