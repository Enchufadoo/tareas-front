import React from 'react'
import TaskFilter, { listStates } from '@/Components/TasksList/TaskFilter'
import { NavigationCTC, renderWithProviders } from '@/Testing/TestUtil'
import { TaskProgressState } from '@/Services/Tasks'
import { fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

describe('TaskFilter', () => {
  it('renders without crashing', () => {
    const { getByText, toJSON } = renderWithProviders(
      <TaskFilter
        tasksCount={{ finished: 5, unfinished: 10 }}
        taskFilterState={0}
        setTaskFilterState={() => {}}
      />
    )

    expect(getByText('10')).toBeTruthy()
    expect(getByText('5')).toBeTruthy()
    expect(getByText('15')).toBeTruthy()
  })

  it('sets the filtered state on press', () => {
    const setTaskFilterState = jest.fn()

    const { getByText } = renderWithProviders(
      <TaskFilter
        taskFilterState={TaskProgressState.open}
        setTaskFilterState={setTaskFilterState}
        tasksCount={{ finished: 8, unfinished: 0 }}
      />
    )

    listStates.forEach((state, index) => {
      fireEvent.press(getByText(state.text))

      expect(setTaskFilterState).toHaveBeenCalledWith(index)
    })
  })

  it('the filtered state doesnt change when same state is clicked', () => {
    const setTaskFilterState = jest.fn()

    const { getByText } = renderWithProviders(
      <TaskFilter
        taskFilterState={TaskProgressState.finished}
        setTaskFilterState={setTaskFilterState}
        tasksCount={{ finished: 8, unfinished: 0 }}
      />
    )

    fireEvent.press(getByText(listStates[TaskProgressState.finished].text))

    expect(setTaskFilterState).toHaveBeenCalledWith(
      listStates[TaskProgressState.finished].value
    )
  })

  it('Snapshot test', () => {
    const setTaskFilterState = jest.fn()
    const component = renderer
      .create(
        <NavigationCTC>
          <TaskFilter
            taskFilterState={TaskProgressState.open}
            setTaskFilterState={setTaskFilterState}
            tasksCount={{ finished: 8, unfinished: 0 }}
          />
        </NavigationCTC>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})
