import { configureStore } from '@reduxjs/toolkit'

import applicationsReducer from './Features/ApplicationSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '@/Services/Api'
import { initMessageListener } from 'redux-state-sync'
import { RtkLoggerMiddleware } from '@/Store/Middleware/RtkLoggerMiddleware'
import { AsyncStorageMiddleware } from '@/Store/Middleware/AsyncStorageMiddleware'

/**
 * redux-state-sync is used so that the app can be logged in / out synchronously across different tabs
 *
 * I use a whitelist approach because the middleware will try to sync everything in the store
 * and rtk uses A LOT of events. Eventually this causes errors, for example,
 * setting a request a finished when in the other tab it didn't finish.
 *
 * The alternative I found is watching the localStorage for changes.
 * Right now the app only stores the token so it would have to make a user data request
 * in all tabs or store all user data.
 *
 * Other possibility is to listen to events from the broadcast channel API without a library.
 *
 * The app still makes a request when creating a new TAB (unnecessarily?)
 *
 * @todo think some more
 *
 */
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      application: applicationsReducer,
      [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => {
      let appMiddleware = [
        api.middleware,
        RtkLoggerMiddleware,
        AsyncStorageMiddleware
      ]

      /*if (Platform.OS === 'web' && false) {
        appMiddleware.push(
          createStateSyncMiddleware({
            whitelist: ['user/logout', 'user/setToken']
          })
        )
      }*/

      return getDefaultMiddleware().concat(appMiddleware)
    }
  })
}

const store = setupStore()

initMessageListener(store)

setupListeners(store.dispatch)

export { store }

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
