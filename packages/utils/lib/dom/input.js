"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("../common/invariant"));

var _isPlainObject = _interopRequireDefault(require("../common/isPlainObject"));

var _isBoolean = _interopRequireDefault(require("../common/isBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = ['text', 'textarea'];

const canEditableElement = editableElement => {
  if (!editableElement || editableElement.nodeType !== 1) {
    return false;
  }

  const type = editableElement.type;
  return !!types.find(t => t === type);
};

var _default = (editableElement, isFiredWhenTyping = true, eventMap = {}) => {
  (0, _invariant.default)(canEditableElement(editableElement), 'The "editableElement" parameter should be a ediable element.');
  (0, _invariant.default)((0, _isBoolean.default)(isFiredWhenTyping), 'The "isFiredWhenTyping" parameter should be boolean.');
  (0, _invariant.default)((0, _isPlainObject.default)(eventMap), 'The "eventMap" parameter should be object.');
  let lock = false;
  let inComposition = false;

  const handleChange = function (e) {
    if (!lock && inComposition) return;

    if (!isFiredWhenTyping) {
      eventMap === null || eventMap === void 0 ? void 0 : eventMap.onInput(e.target.value);
    }

    inComposition = false;
  };

  const handleEvent = function (e) {
    if (e.type === 'compositionend') {
      lock = true;

      if (isFiredWhenTyping) {
        eventMap === null || eventMap === void 0 ? void 0 : eventMap.onInput(e.target.value);
      }
    } else {
      if (e.type === 'compositionstart') inComposition = true;
      lock = false;
    }
  };

  editableElement.addEventListener('change', handleChange);
  editableElement.addEventListener('compositionstart', handleEvent);
  editableElement.addEventListener('compositionupdate', handleEvent);
  editableElement.addEventListener('compositionend', handleEvent);
};

exports.default = _default;