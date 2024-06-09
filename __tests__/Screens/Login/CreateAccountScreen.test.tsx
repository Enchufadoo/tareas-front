import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import CreateAccountScreen from '@/Screens/Login/CreateAccountScreen'
import { TextInput } from '@/Components/Base/Input/TextInput'
import Button from '@/Components/Base/Button/Button'
import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'
import { isInputInvalid, isInputValid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'

const renderScreen = () =>
  renderWithProviders(
    <NavigationContainer>
      <CreateAccountScreen />
    </NavigationContainer>
  )

describe('CreateAccountScreen', () => {
  it('should render the screen', async () => {
    const { root, getByText } = renderWithProviders(
      <NavigationContainer>
        <CreateAccountScreen />
      </NavigationContainer>
    )

    await waitFor(() => {
      getByText('New Account')
      expect(getByText('New Account')).toBeVisible()
      expect(root.findAllByType(TextInput)).toHaveLength(4)
      expect(root.findAllByType(Button)).toHaveLength(1)
    })
  })

  it('Should enable the submit button when all field are valid', async () => {
    jest.useFakeTimers()

    let { handler: emailHandler } = createHandler(
      '/guest/email/available',
      'EMAIL_AVAILABLE'
    )
    let { handler: usernameHandler } = createHandler(
      '/guest/username/available',
      'USERNAME_AVAILABLE'
    )

    let { handler: registrationHandler, response: registrationResponse } =
      createHandler('/guest/registration/email', 'SUCCESSFUL_REGISTRATION')

    server.use(...[emailHandler, usernameHandler, registrationHandler])

    const { root, store } = renderScreen()

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const usernameInput = root.findByProps({ placeholder: 'Username' })
    const nameInput = root.findByProps({ placeholder: 'Name' })
    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const submitButton = root.findByProps({ title: 'Create Account' })

    await act(async () => {
      fireEvent(nameInput, 'changeText', 'ArielL')
      fireEvent(passwordInput, 'changeText', 'password12345')
      fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
      fireEvent(usernameInput, 'changeText', 'ariel123456')
    })

    await waitFor(async () => {
      expect(submitButton.props.disabled).toBe(false)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      expect(store.getState().application.token).toEqual(
        registrationResponse.data.token
      )
    })
  })

  it('Should show a message if the request to create the account fails', async () => {
    jest.useFakeTimers()

    let { handler: emailHandler } = createHandler(
      '/guest/email/available',
      'EMAIL_AVAILABLE'
    )
    let { handler: usernameHandler } = createHandler(
      '/guest/username/available',
      'USERNAME_AVAILABLE'
    )

    let { handler: registrationHandler } = createHandler(
      '/guest/registration/email',
      'RANDOM_ERROR'
    )

    server.use(...[emailHandler, usernameHandler, registrationHandler])

    const { root, getByText } = renderScreen()

    const emailInput = root.findByProps({ placeholder: 'Email' })
    const usernameInput = root.findByProps({ placeholder: 'Username' })
    const nameInput = root.findByProps({ placeholder: 'Name' })
    const passwordInput = root.findByProps({ placeholder: 'Password' })
    const submitButton = root.findByProps({ title: 'Create Account' })

    await act(async () => {
      fireEvent(nameInput, 'changeText', 'ArielL')
      fireEvent(passwordInput, 'changeText', 'password12345')
      fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
      fireEvent(usernameInput, 'changeText', 'ariel123456')
    })

    await waitFor(async () => {
      expect(submitButton.props.disabled).toBe(false)
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      getByText('Registration failed')
    })
  })

  describe('Name input validation', () => {
    it('should work with a valid input', async () => {
      const { root } = renderScreen()
      const nameInput = root.findByProps({ placeholder: 'Name' })

      await act(async () => {
        fireEvent(nameInput, 'changeText', 'fff')
      })

      await waitFor(async () => {
        isInputValid(nameInput)
      })
    })

    it.each(['', 'as', 'a', 'A'.repeat(51)])(
      'should reject an invalid name',
      async (name) => {
        const { root } = renderScreen()
        const nameInput = root.findByProps({ placeholder: 'Name' })

        await act(async () => {
          fireEvent(nameInput, 'changeText', name)
        })
        await waitFor(async () => {
          isInputInvalid(nameInput)
        })
      }
    )
  })

  describe('Email input validation', () => {
    it('should work with a valid input and available email', async () => {
      jest.useFakeTimers()
      let { handler } = createHandler(
        '/guest/email/available',
        'EMAIL_AVAILABLE'
      )
      server.use(handler)

      const { root } = renderScreen()

      const emailInput = root.findByProps({ placeholder: 'Email' })

      await act(async () => {
        fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
      })

      await waitFor(async () => {
        isInputValid(emailInput)
      })
    })

    it('should fail with a valid input and an unavailable email', async () => {
      jest.useFakeTimers()
      let { handler } = createHandler(
        '/guest/email/available',
        'EMAIL_UNAVAILABLE'
      )
      server.use(handler)

      const { root } = renderScreen()

      const emailInput = root.findByProps({ placeholder: 'Email' })

      await act(async () => {
        fireEvent(emailInput, 'changeText', 'ariel@ariel.com')
      })

      await waitFor(async () => {
        isInputInvalid(emailInput)
      })
    })

    it.each(['', 'aafsafdsa', 'lalalala-alala@', '@arara.com'])(
      'should fail with an invalid email',
      async (email) => {
        const { root } = renderScreen()

        const emailInput = root.findByProps({ placeholder: 'Email' })

        await act(async () => {
          fireEvent(emailInput, 'changeText', email)
        })

        await waitFor(async () => {
          isInputInvalid(emailInput)
        })
      }
    )
  })

  describe('Password input validation', () => {
    it.each(['', 'aaa', '12345', 'FAC'.repeat(7)])(
      'should reject more an invalid password',
      async (password) => {
        const { root } = renderScreen()
        const passwordInput = root.findByProps({ placeholder: 'Password' })

        await act(async () => {
          fireEvent(passwordInput, 'changeText', password)
        })
        await waitFor(async () => {
          isInputInvalid(passwordInput)
        })
      }
    )

    describe('Username input validation', () => {
      it('should work with a valid input and available username', async () => {
        jest.useFakeTimers()
        let { handler } = createHandler(
          '/guest/username/available',
          'USERNAME_AVAILABLE'
        )
        server.use(handler)

        const { root } = renderScreen()
        const usernameInput = root.findByProps({ placeholder: 'Username' })

        await act(async () => {
          fireEvent(usernameInput, 'changeText', 'ariel123456')
        })

        await waitFor(async () => {
          isInputValid(usernameInput)
        })
      })

      it('should fail with a valid input and an unavailable username', async () => {
        jest.useFakeTimers()
        let { handler } = createHandler(
          '/guest/username/available',
          'USERNAME_UNAVAILABLE'
        )
        server.use(handler)

        const { root } = renderScreen()
        const usernameInput = root.findByProps({ placeholder: 'Username' })

        await act(async () => {
          fireEvent(usernameInput, 'changeText', 'ariel123456')
        })

        await waitFor(async () => {
          isInputInvalid(usernameInput)
        })
      })

      it.each(['ariel1', 'a', '', '123456', 'A'.repeat(21)])(
        'should fail with an invalid username',
        async (username) => {
          const { root } = renderScreen()

          const usernameInput = root.findByProps({ placeholder: 'Username' })

          await act(async () => {
            fireEvent(usernameInput, 'changeText', username)
          })

          await waitFor(async () => {
            isInputInvalid(usernameInput)
          })
        }
      )
    })
  })
})
