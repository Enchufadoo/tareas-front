import React from 'react'
import {
  mockedNavigate,
  mockNavigation,
  renderWithProviders
} from '@/Testing/TestUtil'
import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'
import Button from '@/Components/Base/Button/Button'
import { TextInput } from '@/Components/Nativewind/React'
import SetNewPasswordFromResetScreen from '@/Screens/PasswordReset/SetNewPasswordFromResetScreen'
import { createHandler, server } from '@/Testing/ApiMocks'
import { act, fireEvent, waitFor } from '@testing-library/react-native'

let navigation = mockNavigation(mockedNavigate)

const testEmail = 'ariel@ariel.com'
const renewalToken = 'token'
const testCode = 'abcd'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <SetNewPasswordFromResetScreen
        route={{
          key: 'key',
          name: 'Set New Password From Reset',
          path: '',
          params: {
            email: testEmail,
            renewalToken: renewalToken,
            code: testCode
          }
        }}
        navigation={navigation()}
      />
    </NavigationContainer>
  )
}

describe('SetNewPasswordFromResetScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(getByText('Set Your New Password')).toBeVisible()
    expect(root.findAllByType(TextInput)).toHaveLength(1)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it('Should navigate to success screen after successful change', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)

    const testCode = 'abcd'

    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password/reset/update',
      'SUCCESSFUL'
    )

    server.use(passwordResetHandler)

    const { root } = renderScreen()

    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const submitButton = root.findByProps({ title: 'Save Password' })

    await act(async () => {
      fireEvent(passwordInput, 'changeText', testCode)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Password Reset Success')
    })
  })

  it('Should not navigate to success screen after an error in setting the password', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)
    const testCode = 'abcd'

    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password/reset/update',
      'INVALID'
    )

    server.use(passwordResetHandler)

    const { root } = renderScreen()

    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const submitButton = root.findByProps({ title: 'Save Password' })

    await act(async () => {
      fireEvent(passwordInput, 'changeText', testCode)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(0)
    })
  })
})
