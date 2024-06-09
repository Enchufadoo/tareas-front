import React from 'react'
import {
  mockedNavigate,
  mockNavigation,
  renderWithProviders
} from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'
import Button from '@/Components/Base/Button/Button'
import { createHandler, server } from '@/Testing/ApiMocks'
import ResetCodeEntryScreen from '@/Screens/PasswordReset/ResetCodeEntryScreen'
import { TextInput } from '@/Components/Nativewind/React'

let navigation = mockNavigation(mockedNavigate)

const testEmail = 'ariel@ariel.com'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <ResetCodeEntryScreen
        route={{
          key: 'key',
          name: 'Reset Code Entry',
          path: '',
          params: { email: testEmail }
        }}
        navigation={navigation()}
      />
    </NavigationContainer>
  )
}

describe('ResetCodeEntryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(getByText('Reset Code Entry')).toBeVisible()
    expect(root.findAllByType(TextInput)).toHaveLength(1)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it('Should navigate to set new password screen on press and success', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)
    const testCode = 'abcd'
    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password/code',
      'SUCCESSFUL'
    )

    server.use(passwordResetHandler)

    const { root, store } = renderScreen()

    const codeInput = root.findByProps({ maxLength: 4 })
    const submitButton = root.findByProps({ title: 'Submit Code' })

    await act(async () => {
      fireEvent(codeInput, 'changeText', testCode)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Set New Password From Reset', {
        email: testEmail,
        code: testCode,
        renewalToken: response.data.renewal_token
      })
    })
  })

  it('Should show the error the server sent when the request fails', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)
    const testCode = 'abcd'
    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password/code',
      'ALREADY_REDEEMED'
    )

    server.use(passwordResetHandler)

    const { root, getByText } = renderScreen()

    const codeInput = root.findByProps({ maxLength: 4 })
    const submitButton = root.findByProps({ title: 'Submit Code' })

    await act(async () => {
      fireEvent(codeInput, 'changeText', testCode)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(0)
      getByText(response.message)
    })
  })

  it('Should show the default error message when an unkown error happens', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)
    const testCode = 'abcd'
    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password/code',
      'SERVER_ERROR'
    )

    server.use(passwordResetHandler)

    const { root, getByText } = renderScreen()

    const codeInput = root.findByProps({ maxLength: 4 })
    const submitButton = root.findByProps({ title: 'Submit Code' })

    await act(async () => {
      fireEvent(codeInput, 'changeText', testCode)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(0)
      getByText("We're sorry, but an unexpected error has occurred.")
    })
  })
})
