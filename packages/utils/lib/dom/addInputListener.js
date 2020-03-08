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
  return !!types.some(t => t === type);
};

const bindTypingOnMarker = typeof Symbol !== 'undefined' ? Symbol('bindTypingOn') : '__bindTypingOn__';

const addEvent = (element, eventName, fn) => {
  if (document.addEventListener) {
    element.addEventListener(eventName, fn, false);
  }
};

var _default = (editableElement, isFiredWhenTyping = true, eventMap) => {
  (0, _invariant.default)(canEditableElement(editableElement), 'The "editableElement" parameter should be a ediable element.');
  (0, _invariant.default)((0, _isBoolean.default)(isFiredWhenTyping), 'The "isFiredWhenTyping" parameter should be boolean.');
  (0, _invariant.default)((0, _isPlainObject.default)(eventMap), 'The "eventMap" parameter should be object.');
  if (editableElement[bindTypingOnMarker]) return;
  editableElement[bindTypingOnMarker] = true;

  if (isFiredWhenTyping) {
    let lock = false;
    let skipComposition = true;
    let prevValue;

    const handler = function (type, value, e = null) {
      if (!lock && !skipComposition) {
        return;
      }

      if (prevValue !== value) {
        if (eventMap === null || eventMap === void 0 ? void 0 : eventMap.onInput) eventMap.onInput(value, e);
        prevValue = value;
      }

      skipComposition = true;
    };

    const handleUserEvent = e => handler(e.type, e.target.value, e);

    const handleUserPastedEvent = e => {
      setTimeout(() => {
        handleUserEvent(e);
      }, 0);
    };

    const handleEvent = function (e) {
      if (e.type === 'compositionend') {
        lock = true;
        handleUserEvent(e);
      } else {
        lock = false;
        if (e.type === 'compositionstart') skipComposition = false;
      }
    };

    addEvent(editableElement, 'change', handleUserEvent);
    addEvent(editableElement, 'keyup', handleUserEvent);
    addEvent(editableElement, 'mouseup', handleUserEvent);
    addEvent(editableElement, 'paste', handleUserPastedEvent);
    addEvent(editableElement, 'compositionstart', handleEvent);
    addEvent(editableElement, 'compositionupdate', handleEvent);
    addEvent(editableElement, 'compositionend', handleEvent);
  } else {
    addEvent(editableElement, 'change', function (e) {
      if (eventMap === null || eventMap === void 0 ? void 0 : eventMap.onInput) eventMap.onInput(e.target.value, e);
    });
  }
};

exports.default = _default;