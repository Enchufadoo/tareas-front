import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY_TOKEN = 'token'
export const STORAGE_KEY_THEME = 'theme'

/**
 * Token and theme are stored in the application's storage, I'll improve it
 * if I need to store more stuff
 */
export const AsyncStorageMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    const storedToken = api.getState().application.token
    const storedTheme = api.getState().application.selectedTheme
    next(action)
    const newToken = api.getState().application.token
    const newTheme = api.getState().application.selectedTheme

    if (newToken && storedToken !== newToken) {
      AsyncStorage.setItem(STORAGE_KEY_TOKEN, newToken)
    }
    if (newTheme && storedTheme !== newTheme) {
      AsyncStorage.setItem(STORAGE_KEY_THEME, newTheme)
    }
  }
