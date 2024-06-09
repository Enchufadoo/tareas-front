import React from 'react'
import { mockedGoBack, renderWithProviders } from '@/Testing/TestUtil'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { expect } from '@jest/globals'
import Button from '@/Components/Base/Button/Button'
import { act, fireEvent } from '@testing-library/react-native'
import { isInputInvalid } from '@/Testing/InputValidation'
import EditProfileScreen from '@/Screens/Settings/EditProfileScreen'
import { createHandler, server } from '@/Testing/ApiMocks'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <EditProfileScreen />
    </NavigationContainer>
  )
}

describe('EditProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(root.findAllByType(TextInput)).toHaveLength(2)
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it.each(['asd', '', 'A'.repeat(21), 'testg2'])(
    'should validate the current username',
    async (username) => {
      const { root, getByText } = renderScreen()

      const usernameInput = root.findByProps({
        placeholder: 'Username'
      })

      await act(async () => {
        fireEvent(usernameInput, 'changeText', username)
      })

      isInputInvalid(usernameInput)
    }
  )

  it.each(['a', '', 'A'.repeat(51), 'jk'])(
    'should validate the current name',
    async (name) => {
      const { root, getByText } = renderScreen()

      const nameInput = root.findByProps({
        placeholder: 'Name'
      })

      await act(async () => {
        fireEvent(nameInput, 'changeText', name)
      })

      isInputInvalid(nameInput)
    }
  )

  it.each([
    { name: '', username: 'ariel12345' },
    { name: 'ariel l', username: '' }
  ])(
    'Should save valid data and go back to settings',
    async ({ name, username }) => {
      jest.useFakeTimers()
      const { root, getByText } = renderScreen()

      let { handler: usernameAvailableHandler, response } = createHandler(
        '/user/username/available',
        'USERNAME_AVAILABLE'
      )

      let { handler: userUpdateHanlder, response: userUpdateResponse } =
        createHandler('/user', 'SUCCESSFUL')

      server.use(usernameAvailableHandler, userUpdateHanlder)

      const nameInput = root.findByProps({
        placeholder: 'Name'
      })
      const usernameInput = root.findByProps({
        placeholder: 'Username'
      })

      const submitButton = root.findByProps({
        title: 'Save Changes'
      })

      await act(async () => {
        fireEvent(nameInput, 'changeText', name)
        fireEvent(usernameInput, 'changeText', username)
        jest.runAllTimers()
      })

      await act(async () => {
        fireEvent(submitButton, 'press')
      })

      expect(mockedGoBack).toHaveBeenCalledTimes(1)
    }
  )

  it('Should display an error and stay in he screen if request fails', async () => {
    jest.useFakeTimers()
    const { root, getByText } = renderScreen()

    let { handler: usernameAvailableHandler, response } = createHandler(
      '/user/username/available',
      'USERNAME_AVAILABLE'
    )

    let { handler: userUpdateHanlder, response: userUpdateResponse } =
      createHandler('/user', 'INVALID_NAME')

    server.use(usernameAvailableHandler, userUpdateHanlder)

    const nameInput = root.findByProps({
      placeholder: 'Name'
    })

    const submitButton = root.findByProps({
      title: 'Save Changes'
    })

    await act(async () => {
      fireEvent(nameInput, 'changeText', 'some name')
      jest.runAllTimers()
    })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    expect(mockedGoBack).toHaveBeenCalledTimes(0)
  })
})
