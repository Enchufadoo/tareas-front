import React from 'react'

import TaskRow from '@/Components/TasksList/TaskRow'
import { mockTask } from '../../__mocks__/Services/Tasks'
import { renderWithProviders } from '@/Testing/TestUtil'
import { fireEvent } from '@testing-library/react-native'
import { capitalize } from '@/Util/StringUtil'
import { ellapsedTime, hours } from '@/Util/DateUtil'
import moment from 'moment'
import MockDate from 'mockdate'

describe('TaskRow', () => {
  it('Swipe events have been triggered', () => {
    const onNavigateToTask = jest.fn()
    const task = mockTask()

    const { getByText } = renderWithProviders(
      <TaskRow index={1} onNavigateToTask={onNavigateToTask} item={task} />
    )

    const element = getByText(task.title)
    expect(element).toBeTruthy()

    fireEvent(element, 'swipeableWillOpen')
    fireEvent(element, 'swipeableWillClose')
  })

  it('On press will navigate to task', () => {
    const onNavigateToTask = jest.fn()
    const task = mockTask()

    const { getByText } = renderWithProviders(
      <TaskRow index={1} onNavigateToTask={onNavigateToTask} item={task} />
    )

    const element = getByText(task.title)
    expect(element).toBeTruthy()

    fireEvent.press(element)
    expect(onNavigateToTask).toBeCalled()
  })

  it('Description and date are rendered correctly', () => {
    const onNavigateToTask = jest.fn()
    const task = mockTask()

    const { getByText } = renderWithProviders(
      <TaskRow index={1} onNavigateToTask={onNavigateToTask} item={task} />
    )

    expect(getByText(task.description)).toBeTruthy()

    const lastProgress = capitalize(ellapsedTime(task.last_progress.created_at))

    expect(getByText(lastProgress)).toBeTruthy()
    expect(getByText(hours(moment(task.last_progress.created_at)))).toBeTruthy()
  })

  /**
   * Skipping this test due to this issue:
   * https://github.com/software-mansion/react-native-gesture-handler/issues/605
   * Need to create my own serializer to ignore the prop handlerTag that
   * gets added dynamically or there's something is wrong that I don't get
   * @todo
   */
  it.skip('renders correctly', () => {
    MockDate.set(new Date('2024-01-01T00:00:00Z'))

    const onNavigateToTask = jest.fn()
    const task = mockTask({
      id: 259,
      title: 'Despecto utpote bardus amo corrupti vis quisquam .',
      description: 'Tutis temperantia ver territo assentator admirati.',
      created_at: '2023-06-20T06:57:07.515Z',
      created_at_date: '2023-10-29',
      hours_since_progress: 20,
      progress_today: false,
      last_progress: { created_at: '2024-04-01T21:37:41.470Z', id: 296 }
    })

    const { toJSON } = renderWithProviders(
      <TaskRow index={1} onNavigateToTask={onNavigateToTask} item={task} />
    )

    const component = toJSON()

    expect(component).toMatchSnapshot()

    MockDate.reset()
  })
})
