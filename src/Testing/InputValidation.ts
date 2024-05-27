import { SimpleLineIcons } from '@/Components/Nativewind/React'
import { expect } from '@jest/globals'
import { ReactTestInstance } from 'react-test-renderer'

/**
 * Checks if the input is valid (if the valid icon is visible)
 * (maybe there's a better way to test it @todo)
 */
export const isInputValid = (input: ReactTestInstance) => {
  let icons = input.findAllByType(SimpleLineIcons)
  expect(icons.filter((icon) => icon.props.name === 'check').length).toBe(1)
}

export const isInputInvalid = (input: ReactTestInstance) => {
  let icons = input.findAllByType(SimpleLineIcons)
  expect(icons.filter((icon) => icon.props.name === 'check').length).toBe(0)
}
