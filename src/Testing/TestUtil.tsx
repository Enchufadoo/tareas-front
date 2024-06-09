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
import ApplicationErrorBoundary from '@/Components/Errors/ApplicationErrorBoundary'

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
    store = setupStore(preloadedState, true),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  injectStore(store)

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ApplicationErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </ApplicationErrorBoundary>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const NavigationCTC = ({ children }: React.PropsWithChildren) => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </NavigationContainer>
  )
}

export const mockedNavigate = jest.fn()
export const mockedGoBack = jest.fn()
export const mockedDispatch = jest.fn()

export const mockNavigation = (mockedNavigate: jest.Mock<any, any, any>) => {
  return () => {
    const actualNav = jest.requireActual('@react-navigation/native')
    return {
      ...actualNav,
      setOptions: jest.fn(),
      useNavigation: () => {
        return {
          navigate: mockedNavigate,
          goBack: mockedGoBack,
          dispatch: mockedDispatch
        }
      }
    }
  }
}
