import React from 'react'
import { mockedGoBack, renderWithProviders } from '@/Testing/TestUtil'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { expect } from '@jest/globals'
import Button from '@/Components/Base/Button/Button'
import ChangePasswordScreen from '@/Screens/Settings/ChangePasswordScreen'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { isInputInvalid } from '@/Testing/InputValidation'
import { createHandler, server } from '@/Testing/ApiMocks'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <ChangePasswordScreen />
    </NavigationContainer>
  )
}

describe('ChangePasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(root.findAllByType(TextInput)).toHaveLength(2)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it.each(['asd', '', 'A'.repeat(21), 'testg2'])(
    'should validate the current password',
    async (password) => {
      const { root, getByText } = renderScreen()

      const currentPasswordInput = root.findByProps({
        placeholder: 'Current Password'
      })

      await act(async () => {
        fireEvent(currentPasswordInput, 'changeText', password)
      })

      isInputInvalid(currentPasswordInput)
    }
  )

  it.each(['asd', '', 'A'.repeat(21), 'testg2'])(
    'should validate the new password',
    async (password) => {
      const { root, getByText } = renderScreen()

      const newPasswordInput = root.findByProps({
        placeholder: 'New Password'
      })

      await act(async () => {
        fireEvent(newPasswordInput, 'changeText', password)
      })

      isInputInvalid(newPasswordInput)
    }
  )

  it('Should navigate to settings screen after successful change', async () => {
    jest.useFakeTimers()
    let goBack = expect(mockedGoBack)

    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password',
      'SUCCESSFUL'
    )

    server.use(passwordResetHandler)

    const { root } = renderScreen()

    const newPasswordInput = root.findByProps({
      placeholder: 'New Password'
    })

    const currentPasswordInput = root.findByProps({
      placeholder: 'Current Password'
    })

    const submitButton = root.findByProps({ title: 'Save Changes' })

    await act(async () => {
      fireEvent(currentPasswordInput, 'changeText', 'somepassword123')
      fireEvent(newPasswordInput, 'changeText', 'anotherpassword123')
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      goBack.toHaveBeenCalledTimes(1)
    })
  })

  it('Should not navigate to settings screen after failed change', async () => {
    jest.useFakeTimers()
    let goBack = expect(mockedGoBack)

    let { handler: passwordResetHandler, response } = createHandler(
      '/user/password',
      'CURRENT_PASSWORD_INCORRECT'
    )

    server.use(passwordResetHandler)

    const { root, getByText } = renderScreen()

    const newPasswordInput = root.findByProps({
      placeholder: 'New Password'
    })

    const currentPasswordInput = root.findByProps({
      placeholder: 'Current Password'
    })

    const submitButton = root.findByProps({ title: 'Save Changes' })

    await act(async () => {
      fireEvent(currentPasswordInput, 'changeText', 'somepassword123')
      fireEvent(newPasswordInput, 'changeText', 'anotherpassword123')
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      goBack.toHaveBeenCalledTimes(0)
    })

    getByText(response.message)
  })
})
