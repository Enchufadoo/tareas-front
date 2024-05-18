import { userApi } from '@/Services/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetSettingsResponse, SettingsData } from '@/Services/Settings'
import { RootState } from '@/Store/Store'
import { createSelector } from 'reselect'
import { STORAGE_KEY_TOKEN } from '@/Store/Middleware/AsyncStorageMiddleware'

export type ThemeSetting = 'system' | 'light' | 'dark'

export interface UserData {
  username: string
  email: string
  name: string
}

export interface ApplicationState {
  token?: string
  selectedTheme: ThemeSetting
  loadingApplication: boolean
  loggedIn: boolean
  user: UserData
  loadingData: boolean
  settings: SettingsData
}

const initialState: ApplicationState = {
  loadingData: false,
  token: null,
  loadingApplication: false,
  loggedIn: false,
  selectedTheme: 'system',
  user: {
    email: '',
    username: '',
    name: ''
  },
  settings: {}
}
/**
 * Main redux store slice,
 * @TODO separate user from application, it's ok for now
 */
export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    /**
     * Sets the token when the user logs in and then saves it in the storage
     */
    setTokenFromLogin: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setLoadingData: (state, action: PayloadAction<boolean>) => {
      state.loadingData = action.payload
    },
    setLoadingApplication: (state, action: PayloadAction<boolean>) => {
      state.loadingApplication = action.payload
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload
      state.loggedIn = true
    },
    setSettingsData: (state, action: PayloadAction<GetSettingsResponse>) => {
      state.settings = action.payload.data.settings
      state.selectedTheme = action.payload.data.settings.theme.value
    },
    setTheme: (state, action: PayloadAction<ThemeSetting>) => {
      state.selectedTheme = action.payload
    },
    setTokenFromStorage: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
      state.loggedIn = !!action.payload
    },
    logout: (state, action: PayloadAction<string>) => {
      AsyncStorage.removeItem(STORAGE_KEY_TOKEN)

      state.token = null
      state.loggedIn = false
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.setUsername.matchFulfilled,
      (state, { payload }) => {
        state.user.username = payload.data.username
      }
    ),
      builder.addMatcher(
        userApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user
          state.loggedIn = true
        }
      )
  }
})

export const selectSettings = (state: RootState) => state.application.settings

export const getSettings = createSelector([selectSettings], (settings) => {
  return settings
})

export const selectThemeName = (state: RootState) => {
  return state.application?.selectedTheme
}

export const selectUserData = (state: RootState) => {
  return state.application?.user
}

export const {
  setTokenFromStorage,
  setTokenFromLogin,
  logout,
  setLoadingData,
  setLoadingApplication,
  setUserData,
  setSettingsData,
  setTheme
} = applicationSlice.actions

export default applicationSlice.reducer
