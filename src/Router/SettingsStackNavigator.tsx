import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { LinkingOptions, Theme } from '@react-navigation/native'
import SettingsScreen from '@/Screens/Settings/Settings'
import ThemesScreen from '@/Screens/Settings/ThemesScreen'
import { useSx } from 'dripsy'
import EditProfileScreen from '@/Screens/Settings/EditProfileScreen'
import ChangePasswordScreen from '@/Screens/Settings/ChangePasswordScreen'

type Props = {
  linking: LinkingOptions<Text>
  theme: Theme
}

export type SettingsStackParamList = {
  'Settings Screen': undefined
  'Theme Screen': undefined
  'Edit Profile Screen': undefined
  'Change Password Screen': undefined
}

const SettingsStackNavigator: React.FC<{}> = (props: Props) => {
  const sx = useSx()
  const StackNavigator = createStackNavigator<SettingsStackParamList>()

  return (
    <StackNavigator.Navigator
      initialRouteName="Settings Screen"
      screenOptions={{
        headerTintColor: sx({ color: '$text' })['color'],
        headerTransparent: false,
        headerShadowVisible: false
      }}
    >
      <StackNavigator.Screen
        name="Settings Screen"
        component={SettingsScreen}
        options={{
          title: 'Settings'
        }}
      />
      <StackNavigator.Screen
        name="Theme Screen"
        component={ThemesScreen}
        options={{
          title: 'Application Theme'
        }}
      />
      <StackNavigator.Screen
        name="Edit Profile Screen"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile'
        }}
      />
      <StackNavigator.Screen
        name="Change Password Screen"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password'
        }}
      />
    </StackNavigator.Navigator>
  )
}

export default SettingsStackNavigator
