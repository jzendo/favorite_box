import invariant from '../common/invariant'
import isPlainObject from '../common/isPlainObject'
import isBoolean from '../common/isBoolean'

const types = ['text', 'textarea']

const canEditableElement = editableElement => {
  if (!editableElement || editableElement.nodeType !== 1) {
    return false
  }

  const type = editableElement.type
  return !!types.some(t => t === type)
}

const bindTypingOnMarker =
  typeof Symbol !== 'undefined' ? Symbol('bindTypingOn') : '__bindTypingOn__'

const addEvent = (element, eventName, fn) => {
  if (document.addEventListener) {
    element.addEventListener(eventName, fn, false)
  }
}

/**
 * Support `pinyin(chinese)` and `english` mix-inputing hookers
 *
 * @param {Element} editableElement editable element
 * @param {Boolean} isFiredWhenTyping fire changed event by typing or by changed
 * @param {Object} eventMap event map
 */
export default (editableElement, isFiredWhenTyping = true, eventMap) => {
  invariant(
    canEditableElement(editableElement),
    'The "editableElement" parameter should be a ediable element.'
  )
  invariant(
    isBoolean(isFiredWhenTyping),
    'The "isFiredWhenTyping" parameter should be boolean.'
  )
  invariant(
    isPlainObject(eventMap),
    'The "eventMap" parameter should be object.'
  )

  // Return when applied
  if (editableElement[bindTypingOnMarker]) return

  editableElement[bindTypingOnMarker] = true

  // isFiredWhenTyping, 'keyup, mouseup'
  if (isFiredWhenTyping) {
    let lock = false
    let skipComposition = true

    let prevValue

    const handler = function (type, value, e = null) {
      if (!lock && !skipComposition) {
        return
      }

      // Only fire when changed
      if (prevValue !== value) {
        if (eventMap?.onInput) eventMap.onInput(value, e)
        prevValue = value
      }

      skipComposition = true
    }

    const handleUserEvent = e => handler(e.type, e.target.value, e)

    const handleUserPastedEvent = e => {
      // Use `setTimeout` to handle after pasted
      setTimeout(() => {
        handleUserEvent(e)
      }, 0)
    }

    const handleEvent = function (e) {
      if (e.type === 'compositionend') {
        lock = true

        // Check the typing:
        // - Case 1: Input method from `pinyin` to `en`
        // - Case 2: the end of composition
        handleUserEvent(e)
      } else {
        lock = false
        if (e.type === 'compositionstart') skipComposition = false
      }
    }

    // Add DOM hookers
    addEvent(editableElement, 'change', handleUserEvent)
    addEvent(editableElement, 'keyup', handleUserEvent)
    addEvent(editableElement, 'mouseup', handleUserEvent)
    addEvent(editableElement, 'paste', handleUserPastedEvent)

    // Add composition events
    addEvent(editableElement, 'compositionstart', handleEvent)
    addEvent(editableElement, 'compositionupdate', handleEvent)
    addEvent(editableElement, 'compositionend', handleEvent)
  } else {
    addEvent(editableElement, 'change', function (e) {
      if (eventMap?.onInput) eventMap.onInput(e.target.value, e)
    })
  }
}
