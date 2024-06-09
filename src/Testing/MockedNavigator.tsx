import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

interface Props {
  component: {}
  initialParams?: object
}
const MockedProviderNavigator = ({
  component: Component,
  initialParams
}: Props) => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator initialRouteName="MockedScreen">
      <Stack.Screen
        component={Component as unknown as React.ComponentType}
        initialParams={initialParams}
        name="MockedScreen"
      />
    </Stack.Navigator>
  )
}

const MockedNavigator = (props: Props) => (
  <NavigationContainer>
    <MockedProviderNavigator {...props} />
  </NavigationContainer>
)

export default MockedNavigator
