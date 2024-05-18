import React from 'react'

import TaskList from '@/Components/TasksList/TaskList'
import { renderWithProviders } from '@/Testing/TestUtil'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { createHandler, getResponseData, server } from '@/Testing/ApiMocks'
import { listStates } from '@/Components/TasksList/TaskFilter'
import { TaskProgressState } from '@/Services/Tasks'
import { NavigationContainer } from '@react-navigation/native'

describe('TaskList', () => {
  server.use(createHandler('/task', '1_UNFINISHED'))

  it('Renders a single unfinished task in the list', async () => {
    const response = getResponseData('/task', '1_UNFINISHED')

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <TaskList />
      </NavigationContainer>
    )

    await waitFor(() => {
      getByText(response['data']['tasks'][0].title)
    })
  })

  it('Renders a list with no tasks', async () => {
    server.use(createHandler('/task', '0_TASKS'))

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <TaskList />
      </NavigationContainer>
    )

    await waitFor(() => {
      getByText('No open tasks')
    })
  })

  it('Renders with no finished tasks', async () => {
    server.use(createHandler('/task', '0_TASKS'))
    const response = getResponseData('/task', '0_TASKS')

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <TaskList />
      </NavigationContainer>
    )

    fireEvent.press(getByText(listStates[TaskProgressState.finished].text))

    await waitFor(() => {
      getByText('No finished tasks')
    })
  })

  it('Renders with a finished task', async () => {
    server.use(createHandler('/task', '0_TASKS'))
    getResponseData('/task', '0_TASKS')

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <TaskList />
      </NavigationContainer>
    )

    server.use(createHandler('/task', '1_FINISHED'))
    const response = getResponseData('/task', '1_FINISHED')

    fireEvent.press(getByText(listStates[TaskProgressState.finished].text))

    await waitFor(() => {
      getByText(response['data']['tasks'][0].title)
    })
  })
})
