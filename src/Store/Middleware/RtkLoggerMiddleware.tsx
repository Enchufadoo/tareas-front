import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI
} from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import { ToastAndroid } from 'react-native'

/**
 * Middleware for API call failures, there are 3 important cases
 * a) Unauthorized requests, any 401 should log out the user, the token has expired or is not valid (ideally)
 * b) 500 errors / timeouts, something is wrong in the server show a generic toast
 * c) Everything else, let the screen handle the error and show no toast
 */
export const RtkLoggerMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === HttpStatusCode.Unauthorized) {
        //loggedInNavigatorRef.navigate('Session Expired')
      } else if (action?.payload?.status >= 500) {
        ToastAndroid.show('Failed to complete the request ', ToastAndroid.LONG)
      } else if (action?.payload?.data === 'Network Error') {
        /**
         * This is in case of a timeout
         */
        ToastAndroid.show('Failed to connect to the server.', ToastAndroid.LONG)
      }
    }

    return next(action)
  }
