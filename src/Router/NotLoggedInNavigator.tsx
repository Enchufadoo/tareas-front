import React from 'react'
import { Text } from 'react-native'

import { LinkingOptions, Theme } from '@react-navigation/native'
import NotLoggedInStackNavigator from '@/Router/NotLoggedInStackNavigator'
import { createDrawerNavigator } from '@react-navigation/drawer'

const AuthDrawerNavigator = createDrawerNavigator<AuthDrawerStackParamList>()

export type AuthDrawerStackParamList = {
  'Not Logged In Stack Navigator': undefined
  'Auth Screen': undefined
  'Registration Screen': undefined
  'Create Account Screen': undefined
}

const config = {
  screens: {
    'Login Screen': 'login',
    'Auth Screen': 'auth',
    'Settings List Screen': 'settings',
    'Registration Screen': 'onboard',
    'Create Account Screen': 'create'
  }
}

const linking = {
  prefixes: ['http://localhost'],
  config
}

type Props = {
  linking: LinkingOptions<Text>
  theme: Theme
}

const NotLoggedinNavigator: React.FC<{}> = (props: Props) => {
  return (
    <AuthDrawerNavigator.Navigator
      useLegacyImplementation={false}
      initialRouteName="Not Logged In Stack Navigator"
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthDrawerNavigator.Screen
        name="Not Logged In Stack Navigator"
        component={NotLoggedInStackNavigator}
      />
    </AuthDrawerNavigator.Navigator>
  )
}

export default NotLoggedinNavigator
