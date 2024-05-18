import {
  setSettingsData,
  setTheme,
  setTokenFromStorage,
  setUserData,
  ThemeSetting
} from '@/Store/Features/ApplicationSlice'
import { AppDispatch, RootState } from '@/Store/Store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  STORAGE_KEY_THEME,
  STORAGE_KEY_TOKEN
} from '@/Store/Middleware/AsyncStorageMiddleware'
import { useLazyGetSettingsQuery } from '@/Services/Settings'
import { useLazyGetUserQuery } from '@/Services/User'

/**
 * Unholy mess to get the theme / authentication / stored data to work with the application loader
 * *sigh*
 */
export function useInitializeApplicationData() {
  const dispatch = useDispatch<AppDispatch>()
  const [getSettingsTrigger, getSettingsResult] = useLazyGetSettingsQuery()
  const [getUserTrigger, getUserResult] = useLazyGetUserQuery()
  const token = useSelector((state: RootState) => state.application.token)
  const [finishLoading, setFinishLoading] = useState<boolean>(false)
  const [storageDataLoaded, setStorageDataLoaded] = useState<boolean>(false)

  /**
   * When the application starts try to load from the storage the token and the theme
   */
  useEffect(() => {
    ;(async () => {
      let storageToken = (await AsyncStorage.getItem(STORAGE_KEY_TOKEN)) ?? null
      dispatch(setTokenFromStorage(storageToken))

      let storageTheme = (await AsyncStorage.getItem(STORAGE_KEY_THEME)) ?? null
      dispatch(setTheme(storageTheme as ThemeSetting))

      if (!storageToken) {
        setFinishLoading(true)
      }

      setStorageDataLoaded(true)
    })()
    return () => {}
  }, [])

  /**
   * If theres a token set call the server for the user data and settings
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getUserTrigger().unwrap()
        dispatch(setUserData(user.data.user))
        const settings = await getSettingsTrigger().unwrap()
        dispatch(setSettingsData(settings))
      } catch (e) {
        setFinishLoading(true)
      }
      setFinishLoading(true)
    }

    if (token) {
      loadData()
    }
  }, [token])

  return finishLoading && storageDataLoaded
}
