import { EnhancedStore } from '@reduxjs/toolkit'
import axios from 'axios'

let store: EnhancedStore

/**
 * Sets up the store to be used outside of components
 * @link https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 *
 * why is this here??? @todo
 */
export const injectStore = (_store: EnhancedStore) => {
  store = _store
}

/**
 *
 */
const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json'
  },
  timeout: 3000
})

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().application.token
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }

  return config
})

export { axiosInstance }
