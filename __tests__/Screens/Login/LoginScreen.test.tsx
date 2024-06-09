import React from 'react'
import { mockedNavigate, renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import LoginScreen from '@/Screens/Login/LoginScreen'
import { TextInput } from '@/Components/Base/Input/TextInput'
import SubmitButton from '@/Components/Base/Button/SubmitButton'
import { isInputInvalid, isInputValid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'
import { expect } from '@jest/globals'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  )
}

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    await waitFor(() => {
      expect(getByText('Welcome Back')).toBeVisible()
      expect(getByText('Forgot Password')).toBeVisible()
      expect(root.findAllByType(TextInput)).toHaveLength(2)
      expect(root.findAllByType(SubmitButton)).toHaveLength(1)
    })
  })

  it('should navigate to the forgot password screen', async () => {
    const { getByText } = renderScreen()

    const forgotPassword = getByText('Forgot Password')
    expect(forgotPassword).toBeVisible()

    await act(async () => {
      fireEvent(forgotPassword, 'press')
    })

    await waitFor(async () => {
      let navigate = expect(mockedNavigate)

      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Reset Password')
    })
  })

  it('should have password and email as required', async () => {
    const { root } = renderScreen()

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const passwordInput = root.findByProps({ placeholder: 'Password' })

    await act(async () => {
      fireEvent(emailInput, 'changeText', '')
      fireEvent(passwordInput, 'changeText', '')
    })

    await waitFor(async () => {
      isInputInvalid(emailInput)
      isInputInvalid(passwordInput)
    })
  })

  it('should login with valid auth data', async () => {
    jest.useFakeTimers()
    const { root, store } = renderScreen()

    let { handler: loginHandler, response } = createHandler(
      '/user/login/email',
      'SUCCESSFUL_LOGIN'
    )

    server.use(loginHandler)

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const loginButton = root.findByProps({ title: 'Log in' })

    await act(async () => {
      fireEvent(emailInput, 'changeText', 'ariel2@ariel.com')
      fireEvent(passwordInput, 'changeText', 'password12345')
    })

    await waitFor(async () => {
      isInputValid(emailInput)
      isInputValid(passwordInput)
    })

    await act(async () => {
      fireEvent(loginButton, 'press')
    })

    await waitFor(async () => {
      expect(store.getState().application.token).toEqual(response.data.token)
    })
  })

  it('should display an error when login fails', async () => {
    jest.useFakeTimers()

    const { root, getByText } = renderScreen()

    let { handler: loginHandler } = createHandler(
      '/user/login/email',
      'FAILED_LOGIN'
    )

    server.use(loginHandler)

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const loginButton = root.findByProps({ title: 'Log in' })

    await act(async () => {
      fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
      fireEvent(passwordInput, 'changeText', 'password12345')
    })

    isInputValid(emailInput)
    isInputValid(passwordInput)

    await act(async () => {
      fireEvent(loginButton, 'press')
    })

    await waitFor(async () => {
      getByText('Invalid email or password')
    })
  })
})
