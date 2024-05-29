import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { expect } from '@jest/globals'
import PasswordResetScreen from '@/Screens/PasswordReset/PasswordResetScreen'
import Button from '@/Components/Base/Button/Button'
import { isInputInvalid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => {
      return {
        navigate: mockedNavigate
      }
    }
  }
})

const renderPasswordResetScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <PasswordResetScreen />
    </NavigationContainer>
  )
}

describe('PasswordReset', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the password reset screen', async () => {
    const { root, getByText } = renderPasswordResetScreen()

    await waitFor(() => {
      expect(getByText('Password Reset')).toBeVisible()

      expect(root.findAllByType(TextInput)).toHaveLength(1)
      expect(root.findAllByType(Button)).toHaveLength(1)
    })
  })

  it.each(['', 'fkafjlka', 'flkjaflka@', '@fakjfak.com'])(
    'should reject invalid email inputs',
    async (email) => {
      const { root, getByText } = renderPasswordResetScreen()

      await waitFor(async () => {
        const emailInput = root.findByProps({ placeholder: 'Email' })

        await act(() => {
          fireEvent(emailInput, 'changeText', email)
        })

        isInputInvalid(emailInput)
      })
    }
  )

  it('Should enable the submit button when all field are valid', async () => {
    jest.useFakeTimers()
    const testEmail = 'ariel@ariel.com'
    let { handler: passwordResetHandler } = createHandler(
      '/user/password/reset',
      'SUCCESSFUL'
    )

    server.use(passwordResetHandler)

    const { root, store } = renderPasswordResetScreen()

    await waitFor(async () => {
      const emailInput = root.findByProps({ placeholder: 'Email' })

      const submitButton = root.findByProps({ title: 'Send Recovery Code' })
      await act(() => {
        fireEvent(emailInput, 'changeText', testEmail)
      })

      await act(() => {
        fireEvent(submitButton, 'press')
      })

      let navigate = expect(mockedNavigate)

      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Reset Code Entry', { email: testEmail })
    })
  })
})
