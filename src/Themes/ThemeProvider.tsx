import React, { PropsWithChildren } from 'react'
import { DripsyProvider } from 'dripsy'

import { useSelector } from 'react-redux'
import { DarkTheme, LightTheme } from '@/Themes/ThemeCollection'
import { selectThemeName } from '@/Store/Features/ApplicationSlice'
import { DripsyFinalTheme } from 'dripsy/src/core/types-v2/declarations'
import { useColorScheme } from 'nativewind'

const ThemeProvider = (props: PropsWithChildren) => {
  const themeName = useSelector(selectThemeName)
  const { colorScheme } = useColorScheme()

  let theme: DripsyFinalTheme

  theme = LightTheme

  if (themeName === 'light') {
    theme = LightTheme
  } else if (themeName === 'dark') {
    theme = DarkTheme
  } else {
    if (colorScheme === 'dark') {
      theme = DarkTheme
    }
  }

  return (
    <>
      {/*// @ts-ignore */}
      <DripsyProvider theme={theme}>{props.children}</DripsyProvider>
    </>
  )
}

export default ThemeProvider
