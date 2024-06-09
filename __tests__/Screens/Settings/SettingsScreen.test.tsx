import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'

import { TouchableOpacity } from 'react-native'
import SettingsScreen from '@/Screens/Settings/SettingsScreen'
import { act, fireEvent } from '@testing-library/react-native'
import { setTokenFromLogin } from '@/Store/Features/ApplicationSlice'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <SettingsScreen />
    </NavigationContainer>
  )
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()
    expect(root.findAllByType(TouchableOpacity).length).toBeGreaterThan(3)
  })

  it('should close the drawer and dispatch logout action when Log Out item is pressed', async () => {
    const someToken = 'sometoken'

    const { getByText, store } = renderScreen()
    const logoutItem = getByText('Log Out')

    await act(async () => {
      store.dispatch(setTokenFromLogin(someToken))
    })

    expect(store.getState().application.token).toEqual(someToken)

    await act(async () => {
      fireEvent.press(logoutItem)
    })

    expect(store.getState().application.token).toEqual(null)
  })
})
