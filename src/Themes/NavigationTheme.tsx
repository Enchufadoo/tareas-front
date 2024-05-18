import { DefaultTheme } from '@react-navigation/native'

/**
 * React navigation has it's own theme
 * @todo put all related logic here
 * @link https://reactnavigation.org/docs/themes/
 * @param sx
 */
export const getNavigationtheme = (sx: any) => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: sx({ color: '$background' })['color'],
      card: sx({ color: '$background' })['color']
    }
  }
}
