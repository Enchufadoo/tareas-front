import React, { PropsWithChildren } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import { useInitializeApplicationData } from '@/Lib/UseInitializeApplicationData'
import { ActivityIndicator, View } from 'react-native'
import loggedInNavigator from '@/Router/LoggedInNavigator'
import notLoggedInNavigator from '@/Router/NotLoggedInNavigator'
import { loggedInNavigatorRef } from '@/Navigation/RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { getNavigationtheme } from '@/Themes/NavigationTheme'
import { useSx } from 'dripsy'

const Router = (props: PropsWithChildren) => {
  const sx = useSx()
  const loggedIn = useSelector((state: RootState) => state.application.loggedIn)
  const navigationTheme = getNavigationtheme(sx)
  const StackNavigator = createStackNavigator<{
    'Logged In Navigator': undefined
    'Not Logged In Navigator': undefined
  }>()

  const loadingApplication = useSelector(
    (state: RootState) => state.application.loadingApplication
  )

  const finishedLoading = useInitializeApplicationData()

  if (!finishedLoading || loadingApplication) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={navigationTheme} ref={loggedInNavigatorRef}>
      <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          <StackNavigator.Screen
            name={'Logged In Navigator'}
            component={loggedInNavigator}
          ></StackNavigator.Screen>
        ) : (
          <StackNavigator.Screen
            name={'Not Logged In Navigator'}
            component={notLoggedInNavigator}
          ></StackNavigator.Screen>
        )}
        {props.children}
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default Router
