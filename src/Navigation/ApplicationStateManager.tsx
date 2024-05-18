import React, { useEffect, useRef, useState } from 'react'
import 'react-native-gesture-handler'

import { AppState } from 'react-native'
import { useLazyGetSettingsQuery } from '@/Services/Settings'

/**
 * Not implemented, checks if the application is in the background
 * @link https://reactnative.dev/docs/appstate
 */
export default function ApplicationStateManager() {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const [getSettingsTrigger, getSettingsResult] = useLazyGetSettingsQuery()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getSettingsTrigger()
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return <></>
}
