import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import { waitFor } from '@testing-library/react-native'
import { createHandler, server } from '@/Testing/ApiMocks'
import { NavigationContainer } from '@react-navigation/native'
import ThisWeekTasksScreen from '@/Screens/Tasks/ThisWeekTasksScreen'
import { Entypo } from '@/Components/Nativewind/React'

describe('ThisWeekTasksScreen', () => {
  it('Renders a message showing no tasks were created', async () => {
    const { handler } = createHandler('/task/week', 'NO_TASKS')
    server.use(handler)

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
    const { handler, response } = createHandler('/task/week', '4_TASKS')
    server.use(handler)

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
    const { handler, response } = createHandler(
      '/task/week',
      '1_TASK_NO_PROGRESS'
    )
    server.use(handler)

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
