"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDefaultUuid = exports.default = exports.genStrUniqueId = void 0;
let uniqueFactorValue_ = 0;

const joinWith_ = (prefix, id, suffix) => prefix + String(id) + suffix;

const genStrUniqueId = (prefix = '', suffix = '') => joinWith_(prefix, ++uniqueFactorValue_, suffix);

exports.genStrUniqueId = genStrUniqueId;
const EOF_VALUE = undefined;

var _default = initFactory => (prefix = '', suffix = '') => {
  const {
    userGenerateStrUniqueId,
    getCurrent,
    onDispose
  } = initFactory({
    prefix,
    suffix
  });
  let isEOF = false;
  let current = (userGenerateStrUniqueId || genStrUniqueId)(prefix, suffix);

  const genUuid = () => {
    if (isEOF) return EOF_VALUE;
    current = getCurrent({
      prefix,
      suffix
    });
    return current;
  };

  genUuid.current = () => current;

  genUuid.dispose = () => {
    onDispose({
      prefix,
      suffix
    });
    isEOF = true;
    current = EOF_VALUE;
  };

  genUuid.isEOF = () => isEOF === true;

  if (process.env.NODE_ENV === 'test') {
    genUuid.getUniqueFactorValue_ = () => uniqueFactorValue_;

    genUuid.joinWith_ = joinWith_;
  }

  return genUuid;
};

exports.default = _default;
const defaultPrefix = '__';
const defaultSuffix = '__';

const buildDefaultUuid = uuidByFactory => {
  const uuid = uuidByFactory(defaultPrefix, defaultSuffix);
  uuid.prefix = defaultPrefix;
  uuid.suffix = defaultSuffix;
  return uuid;
};

exports.buildDefaultUuid = buildDefaultUuid;