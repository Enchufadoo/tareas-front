/**
 * Stolen from
 * https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 *
 * Set's up a store for testing
 */

import React, { PropsWithChildren } from 'react'
import type { RenderOptions } from '@testing-library/react-native'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import { AppStore, RootState, setupStore } from '@/Store/Store'
import { injectStore } from '@/Services/Axios/AxiosConfig'
import ThemeProvider from '@/Themes/ThemeProvider'
import { NavigationContainer } from '@react-navigation/native'
import { StoreProvider } from '@/Context/StoreProvider'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  injectStore(store)

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

const NavigationCTC = ({ children }: React.PropsWithChildren) => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </NavigationContainer>
  )
}

export { NavigationCTC }
