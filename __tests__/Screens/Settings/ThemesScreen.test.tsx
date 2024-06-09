import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import ThemesScreen from '@/Screens/Settings/ThemesScreen'
import RadioButton from '@/Components/Base/RadioButton'
import { createHandler, server } from '@/Testing/ApiMocks'
import { TouchableOpacity } from '@/Components/Nativewind/React'
import { setSettingsData } from '@/Store/Features/ApplicationSlice'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <ThemesScreen />
    </NavigationContainer>
  )
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()
    expect(root.findAllByType(RadioButton).length).toBe(3)
  })

  it('should change the theme in the store when selected', async () => {
    jest.useFakeTimers()

    const { getByText, store, root } = renderScreen()

    expect(store.getState().application.selectedTheme).toEqual('system')

    let { handler: listSettingsHandler, response } = createHandler(
      '/setting',
      'SUCCESSFUL_LISTING'
    )

    await act(async () => {
      store.dispatch(setSettingsData(response))
    })

    let { handler: setSettingHandler } = createHandler(
      '/setting/:id',
      'SUCCESSFUL'
    )

    server.use(listSettingsHandler, setSettingHandler)

    let darkThemeButton = root.findByProps({ text: 'Dark Theme' })
    let actualButton = darkThemeButton.findAllByType(TouchableOpacity)[0]

    await act(async () => {
      fireEvent.press(actualButton)
      jest.runAllTimers()
    })

    expect(store.getState().application.selectedTheme).toEqual('dark')
  })

  it('should not change the theme if the request fails', async () => {
    jest.useFakeTimers()

    const { getByText, store, root } = renderScreen()

    expect(store.getState().application.selectedTheme).toEqual('system')

    let { handler: listSettingsHandler, response } = createHandler(
      '/setting',
      'SUCCESSFUL_LISTING'
    )

    await act(async () => {
      store.dispatch(setSettingsData(response))
    })

    let { handler: setSettingHandler } = createHandler(
      '/setting/:id',
      'FAILURE'
    )

    server.use(listSettingsHandler, setSettingHandler)

    let darkThemeButton = root.findByProps({ text: 'Dark Theme' })
    let actualButton = darkThemeButton.findAllByType(TouchableOpacity)[0]

    await act(async () => {
      fireEvent.press(actualButton)
      jest.runAllTimers()
    })

    await waitFor(() => {
      getByText('Failed to save the setting')
      expect(store.getState().application.selectedTheme).toEqual('dark')
    })
  })
})
