import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useSx } from 'dripsy'
import CustomDrawerContent from '@/Components/Navigation/CustomDrawer'
import SettingsStackNavigator from '@/Router/SettingsStackNavigator'
import LoggedInStackNavigator from '@/Router/LoggedInStackNavigator'

export type LoggedInDrawerParamList = {
  'Logged In Stack Navigator': undefined
  'Settings Stack Navigator': undefined
}

const LoggedInNavigator: React.FC<{}> = () => {
  const sx = useSx()

  const LoggedInDrawerNavigator =
    createDrawerNavigator<LoggedInDrawerParamList>()

  return (
    <LoggedInDrawerNavigator.Navigator
      initialRouteName={'Logged In Stack Navigator'}
      screenOptions={{
        headerShown: true,
        headerTitle: '',

        headerStyle: sx({ backgroundColor: '$drawerBackground' }),
        headerShadowVisible: false,
        drawerActiveTintColor: sx({ color: '$primary' })['color'],
        drawerActiveBackgroundColor: 'transparent',
        headerTintColor: sx({ color: '$headerTint' })['color'],
        drawerInactiveTintColor: sx({ color: '$text' })['color']
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <LoggedInDrawerNavigator.Screen
        name="Logged In Stack Navigator"
        options={{
          title: 'Home'
        }}
        component={LoggedInStackNavigator}
      />

      <LoggedInDrawerNavigator.Screen
        name="Settings Stack Navigator"
        options={{ title: 'Settings' }}
        component={SettingsStackNavigator}
      />
    </LoggedInDrawerNavigator.Navigator>
  )
}

export default LoggedInNavigator
