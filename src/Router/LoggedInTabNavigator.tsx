import LoggedInStackNavigator from '@/Router/LoggedInStackNavigator'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ThisWeekTasksScreen from '@/Screens/Tasks/ThisWeekTasksScreen'
import { useSx } from 'dripsy'

const Tab = createMaterialTopTabNavigator()

const LoggedInTabNavigator = () => {
  const sx = useSx()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: sx({ color: '$headerTint' })['color'],
        tabBarIndicatorStyle: sx({ backgroundColor: '$primary' })
      }}
    >
      <Tab.Screen name="Today" component={LoggedInStackNavigator} />
      <Tab.Screen name="This Week" component={ThisWeekTasksScreen} />
    </Tab.Navigator>
  )
}

export default LoggedInTabNavigator
