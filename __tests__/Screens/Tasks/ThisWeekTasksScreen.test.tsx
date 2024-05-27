import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import { waitFor } from '@testing-library/react-native'
import { createHandler, getResponseData, server } from '@/Testing/ApiMocks'
import { NavigationContainer } from '@react-navigation/native'
import ThisWeekTasksScreen from '@/Screens/Tasks/ThisWeekTasksScreen'
import { Entypo } from '@/Components/Nativewind/React'

describe('ThisWeekTasksScreen', () => {
  it('Renders a message showing no tasks were created', async () => {
    server.use(createHandler('/task/week', 'NO_TASKS'))

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <ThisWeekTasksScreen />
      </NavigationContainer>
    )

    await waitFor(() => {
      getByText("You haven't created any task")
    })
  })

  it('Try rendering some tasks with progress', async () => {
    server.use(createHandler('/task/week', '4_TASKS'))
    const response = getResponseData('/task/week', '4_TASKS')

    const { root, getAllByText, getByText } = renderWithProviders(
      <NavigationContainer>
        <ThisWeekTasksScreen />
      </NavigationContainer>
    )

    await waitFor(() => {
      expect(root.findAllByType(Entypo)).toHaveLength(4)
      for (let a of response['data']['tasks']) {
        getByText(a.title)
      }
    })
  })

  it('Try rendering some tasks without progress', async () => {
    let res = server.use(createHandler('/task/week', '1_TASK_NO_PROGRESS'))
    const response = getResponseData('/task/week', '1_TASK_NO_PROGRESS')

    const { root, getByText } = renderWithProviders(
      <NavigationContainer>
        <ThisWeekTasksScreen />
      </NavigationContainer>
    )

    await waitFor(() => {
      expect(root.findAllByType(Entypo)).toHaveLength(0)

      for (let a of response['data']['tasks']) {
        getByText(a.title)
      }
    })
  })
})
