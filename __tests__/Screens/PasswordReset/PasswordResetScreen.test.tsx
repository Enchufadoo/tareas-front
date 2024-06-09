import React from 'react'
import { mockedNavigate, renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { expect } from '@jest/globals'
import PasswordResetScreen from '@/Screens/PasswordReset/PasswordResetScreen'
import Button from '@/Components/Base/Button/Button'
import { isInputInvalid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <PasswordResetScreen />
    </NavigationContainer>
  )
}

describe('PasswordResetScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(getByText('Password Reset')).toBeVisible()
    expect(root.findAllByType(TextInput)).toHaveLength(1)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it.each(['', 'fkafjlka', 'flkjaflka@', '@fakjfak.com'])(
    'should reject invalid email inputs',
    async (email) => {
      const { root, getByText } = renderScreen()

      const emailInput = root.findByProps({ placeholder: 'Email' })

      await act(async () => {
        fireEvent(emailInput, 'changeText', email)
      })

      isInputInvalid(emailInput)
    }
  )

  it('Should enable the submit button when all field are valid', async () => {
    jest.useFakeTimers()
    let navigate = expect(mockedNavigate)
    const testEmail = 'ariel@ariel.com'
    let { handler: passwordResetHandler } = createHandler(
      '/user/password/reset',
      'SUCCESSFUL'
    )

    server.use(passwordResetHandler)

    const { root, store } = renderScreen()

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const submitButton = root.findByProps({ title: 'Send Recovery Code' })

    await act(async () => {
      fireEvent(emailInput, 'changeText', testEmail)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Reset Code Entry', { email: testEmail })
    })
  })
})
