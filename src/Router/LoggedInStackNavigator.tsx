import React from 'react'

import { useSx } from 'dripsy'
import HomeScreen from '@/Screens/HomeScreen'
import ViewTask from '@/Screens/Tasks/ViewTaskScreen'
import CreateTaskScreen from '@/Screens/Tasks/CreateTaskScreen'
import SessionExpired from '@/Components/Errors/SessionExpired'
import { createStackNavigator } from '@react-navigation/stack'

export type LoggedInStackParamList = {
  Tasks: undefined
  'View Task': {
    id: number
  }
  'Create Task': undefined
  'Home Screen': undefined
  'Session Expired': undefined
}

const LoggedInStackNavigator: React.FC<{}> = () => {
  const sx = useSx()
  const StackNavigator = createStackNavigator<LoggedInStackParamList>()

  return (
    <StackNavigator.Navigator
      initialRouteName="Home Screen"
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          color: sx({ color: '$text' })['color']
        },
        headerTintColor: sx({ color: '$text' })['color'],
        headerTransparent: false,
        headerShadowVisible: false
        // headerTintColor: sx({ color: '$text' })['color']
      }}
    >
      <StackNavigator.Screen
        options={{ headerShown: false }}
        name="Home Screen"
        component={HomeScreen}
      />
      <StackNavigator.Screen
        name="View Task"
        component={ViewTask}
        options={{
          presentation: 'modal',
          title: 'View Task'
        }}
      />
      <StackNavigator.Screen
        name="Create Task"
        component={CreateTaskScreen}
        options={{
          headerShown: true
        }}
      />
      <StackNavigator.Screen
        name="Session Expired"
        component={SessionExpired}
        options={{
          headerShown: false
        }}
      />
    </StackNavigator.Navigator>
  )
}

export default LoggedInStackNavigator
