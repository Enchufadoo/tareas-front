import React from 'react'
import 'react-native-gesture-handler'

import Router from '@/Router/Router'

import { StoreProvider } from '@/Context/StoreProvider'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import './styles'
import ThemeProvider from '@/Themes/ThemeProvider'
import ThemedStatusBar from '@/Themes/ThemedStatusBar'
import ApplicationErrorBoundary from '@/Components/Errors/ApplicationErrorBoundary'
import { LogBox } from 'react-native'

LogBox.uninstall()

export default function App() {
  return (
    <ActionSheetProvider>
      <ApplicationErrorBoundary>
        <StoreProvider>
          <ThemeProvider>
            <ThemedStatusBar />

            <Router></Router>
          </ThemeProvider>
        </StoreProvider>
      </ApplicationErrorBoundary>
    </ActionSheetProvider>
  )
}
