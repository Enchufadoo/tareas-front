import React from 'react'
import { StatusBar, StatusBarStyle } from 'react-native'
import { useSx } from 'dripsy'
import { useSelector } from 'react-redux'
import { selectThemeName } from '@/Store/Features/ApplicationSlice'
import { Themes } from '@/Themes/ThemeCollection'
import { RootState } from '@/Store/Store'

/**
 * The "loading-application" logic shouldn't happen if the application
 * had a splash screen @todo
 */
const ThemedStatusBar = () => {
  const sx = useSx()

  const loadingApplication = useSelector(
    (state: RootState) => state.application.loadingApplication
  )

  const themeName = useSelector(selectThemeName)

  /**
   * Right now I don't need anything other than light content,
   * but when I add more themes I will need to change this on theme by theme basis
   * @todo
   */
  let barStyle: StatusBarStyle =
    themeName === Themes.light ? 'light-content' : 'light-content'

  return (
    <>
      {!loadingApplication && (
        <StatusBar
          translucent={true}
          animated={true}
          showHideTransition={'fade'}
          barStyle={barStyle}
          backgroundColor={sx({ color: '$statusBarColor' })['color']}
        />
      )}
    </>
  )
}

export default ThemedStatusBar
