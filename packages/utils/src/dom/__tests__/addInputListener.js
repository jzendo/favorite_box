/**
 * @jest-environment jsdom
 */

/* global Event, describe, test, expect, beforeEach, afterEach */
import addInputListener from '../addInputListener'

describe('DOM addInputListener', () => {
  let input

  beforeEach(() => {
    input = document.createElement('input')
  })

  afterEach(() => {
    input = null
  })

  test('invalid parameters', () => {
    expect(() => {
      addInputListener()
    }).toThrow()

    expect(() => {
      addInputListener(document.createElement('div'))
    }).toThrow()

    expect(() => {
      addInputListener(document.createElement('div'), 'abc')
    }).toThrow()

    expect(() => {
      addInputListener(document.createElement('div'), 'abc', true)
    }).toThrow()

    expect(() => {
      addInputListener(document.createElement('input'), true, document)
    }).toThrow()
  })

  test('fire when changed', done => {
    const testValue = 'my mock input'

    addInputListener(input, false, {
      onInput (val) {
        expect(val).toEqual(testValue)
        done()
      }
    })

    // Dispatch `change` event
    input.value = testValue
    const mockChangeEvent = new Event('change')
    input.dispatchEvent(mockChangeEvent)
  })

  test('fire when typing, same value trigger twice times', done => {
    const testValue = 'my mock input'
    let countOfOnInput = 0

    addInputListener(input, true, {
      onInput (val) {
        countOfOnInput += 1

        expect(val).toEqual(testValue)
        expect(countOfOnInput).toEqual(1)
        done()
      }
    })

    // Dispatch `change` event
    input.value = testValue
    input.dispatchEvent(new Event('keyup'))

    // Dispatch `change` event, again
    input.value = testValue
    input.dispatchEvent(new Event('keyup'))
  })

  test('fire when typing by paste', done => {
    const testValue = 'my mock input from pasted'
    const defaultInputValue = '__'

    document.body.appendChild(input)

    addInputListener(input, true, {
      onInput (val) {
        expect(val).toEqual(defaultInputValue + testValue)
        // Reset
        document.body.removeChild(input)
        done()
      }
    })

    // ---------------------------------------------------------------
    // TODO: no way to copy/paste in jsdom enviroment as i known,
    //  should has one ?
    // ---------------------------------------------------------------

    // Mock only !!!
    // Mock paste action as following:
    // - 1. make input focusable
    // - 2. make `document.activeElement == input`, then reset its value.
    // - 3. dispatch a paste event
    input.focus()
    // Paste value to the target element which has actived by reset its value
    document.activeElement.value = defaultInputValue + testValue
    input.dispatchEvent(new Event('paste'))
  })
})
