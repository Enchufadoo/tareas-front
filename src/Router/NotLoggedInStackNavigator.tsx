import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '@/Screens/Login/LoginScreen'

import CreateAcountScreen from '@/Screens/Login/CreateAccountScreen'
import PasswordResetScreen from '@/Screens/PasswordReset/PasswordResetScreen'
import ResetCodeEntryScreen from '@/Screens/PasswordReset/ResetCodeEntryScreen'

import { LinkingOptions, Theme } from '@react-navigation/native'
import SetNewPasswordFromResetScreen from '@/Screens/PasswordReset/SetNewPasswordFromResetScreen'
import PasswordResetSuccessScreen from '@/Screens/PasswordReset/PasswordResetSuccessScreen'
import { useSx } from 'dripsy'

type Props = {
  linking: LinkingOptions<Text>
  theme: Theme
}

export type NotLoggedInStackParamList = {
  'Login Screen': undefined
  'Auth Screen': undefined
  'Create Account Screen': undefined
  'Reset Password': undefined
  'Reset Code Entry': {
    email: string
  }
  'Set New Password From Reset': {
    email: string
    renewalToken: string
    code: string
  }
  'Password Reset Success': undefined
}

const NotLoggedInStackNavigator: React.FC<{}> = (props: Props) => {
  const StackNavigator = createStackNavigator<NotLoggedInStackParamList>()
  const sx = useSx()
  return (
    <StackNavigator.Navigator
      initialRouteName="Login Screen"
      screenOptions={{
        headerTransparent: false,
        headerShadowVisible: false,
        headerTintColor: sx({ color: '$headerTint' })['color'],
        headerShown: true,
        headerTitle: '',
        headerTitleStyle: {
          color: sx({ color: '$text' })['color']
        }
      }}
    >
      <StackNavigator.Screen name="Login Screen" component={LoginScreen} />

      <StackNavigator.Screen
        name="Create Account Screen"
        component={CreateAcountScreen}
      />
      <StackNavigator.Screen
        name="Reset Password"
        component={PasswordResetScreen}
      />
      <StackNavigator.Screen
        name="Reset Code Entry"
        component={ResetCodeEntryScreen}
      />

      <StackNavigator.Screen
        name="Set New Password From Reset"
        component={SetNewPasswordFromResetScreen}
      />
      <StackNavigator.Screen
        name="Password Reset Success"
        component={PasswordResetSuccessScreen}
      />
    </StackNavigator.Navigator>
  )
}

export default NotLoggedInStackNavigator
