import LoggedInStackNavigator from '@/Router/LoggedInStackNavigator'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ThisWeekTasksScreen from '@/Screens/Tasks/ThisWeekTasksScreen'

const Tab = createMaterialTopTabNavigator()

const LoggedInTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Today" component={LoggedInStackNavigator} />
      <Tab.Screen name="This Week" component={ThisWeekTasksScreen} />
    </Tab.Navigator>
  )
}

export default LoggedInTabNavigator
