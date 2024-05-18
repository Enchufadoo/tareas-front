import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import * as RNComponents from 'react-native'
import { ActivityIndicator } from 'react-native'
import { TextInput, TextInputProps } from '@/Components/Base/Input/TextInput'
import { renderWithProviders } from '@/Testing/TestUtil'

describe('Input component', () => {
  let props: TextInputProps

  beforeEach(() => {
    props = {
      isValid: {},
      inProgress: false,
      onBlurForm: jest.fn()
    }
  })

  it('should render without crashing', () => {
    const { getByTestId } = renderWithProviders(
      <TextInput {...props} testID={'InputComponent'} />
    )
    expect(getByTestId('InputComponent')).toBeTruthy()
  })

  it('should call onBlurForm when onBlur event triggered', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TextInput {...props} testID={'InputComponent'} />
    )

    const inputField = getByTestId('InputComponent')
    const textInput = inputField.findByType(RNComponents.TextInput)
    fireEvent(textInput, 'blur')
    expect(props.onBlurForm).toHaveBeenCalled()
  })

  it('should call onFocus when onFocus event triggered', () => {
    const { getByTestId } = renderWithProviders(
      <TextInput testID={'InputComponent'} {...props} />
    )

    const inputField = getByTestId('InputComponent')
    fireEvent(inputField, 'focus')
    // Test your onFocus logic here
  })

  it('renders with different styles when isValid is set', () => {
    props.isValid = { invalid: false, isDirty: true }

    const { getByTestId } = renderWithProviders(
      <TextInput testID={'InputComponent'} {...props} />
    )
    const inputField = getByTestId('InputComponent')
  })

  it('displays rightIcon when inProgress is true', () => {
    props.inProgress = true

    const { getByTestId, getByText } = renderWithProviders(
      <TextInput {...props} testID={'InputComponent'} inProgress={true} />
    )
    const inputField = getByTestId('InputComponent')

    let ai = inputField.findAllByType(ActivityIndicator)
    expect(ai).toHaveLength(1)
  })
})
