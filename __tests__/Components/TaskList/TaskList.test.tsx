import React from 'react'

import TaskList from '@/Components/TasksList/TaskList'
import { renderWithProviders } from '@/Testing/TestUtil'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { createHandler, server } from '@/Testing/ApiMocks'
import { listStates } from '@/Components/TasksList/TaskFilter'
import { TaskProgressState } from '@/Services/Tasks'
import { NavigationContainer } from '@react-navigation/native'

describe('TaskList', () => {
  it('Renders a single unfinished task in the list', async () => {
    const { handler, response } = createHandler('/task', '1_UNFINISHED')

    server.use(handler)

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
    const { handler } = createHandler('/task', '0_TASKS')

    server.use(handler)

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
    const { handler } = createHandler('/task', '0_TASKS')

    server.use(handler)

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
    const { handler: handlerNoTasks } = createHandler('/task', '0_TASKS')
    const { handler: handlerOneFinished, response: responseOneFinished } =
      createHandler('/task', '1_FINISHED')

    server.use(handlerNoTasks)

    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <TaskList />
      </NavigationContainer>
    )

    server.use(handlerOneFinished)

    fireEvent.press(getByText(listStates[TaskProgressState.finished].text))

    await waitFor(() => {
      getByText(responseOneFinished['data']['tasks'][0].title)
    })
  })
})
