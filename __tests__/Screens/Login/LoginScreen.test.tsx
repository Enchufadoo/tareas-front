import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import LoginScreen from '@/Screens/Login/LoginScreen'
import { TextInput } from '@/Components/Base/Input/TextInput'
import SubmitButton from '@/Components/Base/Button/SubmitButton'
import { isInputInvalid, isInputValid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'
import { expect } from '@jest/globals'

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

const renderLoginScreen = () => {
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

  it('should render the login screen', async () => {
    const { root, getByText } = renderLoginScreen()

    await waitFor(() => {
      expect(getByText('Welcome Back')).toBeVisible()
      expect(getByText('Forgot Password')).toBeVisible()
      expect(root.findAllByType(TextInput)).toHaveLength(2)
      expect(root.findAllByType(SubmitButton)).toHaveLength(1)
    })
  })

  it('should navigate to the forgot password screen', async () => {
    const { getByText } = renderLoginScreen()

    await waitFor(async () => {
      const forgotPassword = getByText('Forgot Password')
      expect(forgotPassword).toBeVisible()

      await act(() => {
        fireEvent(forgotPassword, 'press')
      })
      let navigate = expect(mockedNavigate)

      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Reset Password')
    })
  })

  it('should have password and email as required', async () => {
    const { root } = renderLoginScreen()

    await waitFor(async () => {
      const emailInput = root.findByProps({ placeholder: 'Email' })
      const passwordInput = root.findByProps({ placeholder: 'Password' })

      await act(() => {
        fireEvent(emailInput, 'changeText', '')
        fireEvent(passwordInput, 'changeText', '')
      })

      isInputInvalid(emailInput)
      isInputInvalid(passwordInput)
    })
  })

  it('should login with valid auth data', async () => {
    jest.useFakeTimers()
    const { root, store } = renderLoginScreen()

    let { handler: loginHandler, response } = createHandler(
      '/user/login/email',
      'SUCCESSFUL_LOGIN'
    )

    server.use(loginHandler)

    await waitFor(async () => {
      const emailInput = root.findByProps({ placeholder: 'Email' })
      const passwordInput = root.findByProps({ placeholder: 'Password' })
      const loginButton = root.findByProps({ title: 'Log in' })

      await act(() => {
        fireEvent(emailInput, 'changeText', 'ariel2@ariel.com')
        fireEvent(passwordInput, 'changeText', 'password12345')
        isInputValid(emailInput)
        isInputValid(passwordInput)
      })

      await act(() => {
        fireEvent(loginButton, 'press')
        expect(store.getState().application.token).toEqual(response.data.token)
      })
    })
  })

  it('should display an error when login fails', async () => {
    jest.useFakeTimers()

    const { root, getByText } = renderLoginScreen()

    let { handler: loginHandler } = createHandler(
      '/user/login/email',
      'FAILED_LOGIN'
    )

    server.use(loginHandler)

    await waitFor(async () => {
      const emailInput = root.findByProps({ placeholder: 'Email' })
      const passwordInput = root.findByProps({ placeholder: 'Password' })
      const loginButton = root.findByProps({ title: 'Log in' })

      await act(() => {
        fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
        fireEvent(passwordInput, 'changeText', 'password12345')
        isInputValid(emailInput)
        isInputValid(passwordInput)
      })

      await act(() => {
        fireEvent(loginButton, 'press')
        getByText('Invalid email or password')
      })
    })
  })
})
