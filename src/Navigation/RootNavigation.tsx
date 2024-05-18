import { createNavigationContainerRef } from '@react-navigation/native'
import { LoggedInStackParamList } from '@/Router/LoggedInStackNavigator'

export const loggedInNavigatorRef =
  createNavigationContainerRef<LoggedInStackParamList>()

/**
 * Navigation function outside of components
 * @link https://reactnavigation.org/docs/navigating-without-navigation-prop
 * improve @todo
 */
export function navigate<RouteName extends keyof LoggedInStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends LoggedInStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: LoggedInStackParamList[RouteName]]
      : [screen: RouteName, params: LoggedInStackParamList[RouteName]]
    : never
) {
  if (loggedInNavigatorRef.isReady()) {
    loggedInNavigatorRef.navigate(...args)
  }
}
