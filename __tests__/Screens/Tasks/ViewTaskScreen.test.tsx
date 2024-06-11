import React from 'react'

import { renderWithProviders } from '@/Testing/TestUtil'
import '@testing-library/jest-native/extend-expect'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import ViewTaskScreen from '@/Screens/Tasks/ViewTaskScreen'
import { createHandler, server } from '@/Testing/ApiMocks'
import { capitalize } from '@/Util/StringUtil'
import { ReactTestInstance } from 'react-test-renderer'
import MockedNavigator from '@/Testing/MockedNavigator'

jest.mock('@expo/react-native-action-sheet', () => ({
  ...jest.requireActual('@expo/react-native-action-sheet')
}))
const ExpoActionSheet = require('@expo/react-native-action-sheet')

const renderScreen = () => {
  return renderWithProviders(
    <MockedNavigator
      component={ViewTaskScreen}
      initialParams={{ route: { params: { id: 3 } } }}
    ></MockedNavigator>
  )
}

describe('ViewTaskScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { handler, response } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )
    server.use(handler)

    const { getByText } = renderScreen()

    await waitFor(() => {
      getByText(capitalize(response.data.task.title))
      getByText(response.data.task.description)
    })
  })

  it('should add progress when clicking the button', async () => {
    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    server.use(getTaskHandler)

    const { root, getByText } = renderScreen()

    let addProgressButton: ReactTestInstance

    await waitFor(() => {
      addProgressButton = root.findByProps({ title: 'Add Progress' })
    })

    server.resetHandlers()

    const { handler: getTaskProgressAddedHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY_PROGRESS_ADDED'
    )

    const { handler: addProgressHandler, response: addProgressResponse } =
      createHandler('/task/progress/:id', 'ADD_PROGRESS_SUCCESSFULLY')

    server.use(getTaskProgressAddedHandler, addProgressHandler)

    await act(async () => {
      fireEvent(addProgressButton, 'press')
    })

    await waitFor(() => {
      getByText('Progress added today')
    })
  })

  it('should add progress when clicking the button', async () => {
    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    server.use(getTaskHandler)

    const { root, getByText } = renderScreen()

    let addProgressButton: ReactTestInstance

    await waitFor(() => {
      addProgressButton = root.findByProps({ title: 'Add Progress' })
    })

    server.resetHandlers()

    const { handler: getTaskProgressAddedHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY_PROGRESS_ADDED'
    )

    const { handler: addProgressHandler, response: addProgressResponse } =
      createHandler('/task/progress/:id', 'ADD_PROGRESS_SUCCESSFULLY')

    server.use(getTaskProgressAddedHandler, addProgressHandler)

    await act(async () => {
      fireEvent(addProgressButton, 'press')
    })

    await waitFor(() => {
      getByText('Progress added today')
    })
  })

  it('clicking the menu button displays options', async () => {
    const showActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions
    })

    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    server.use(getTaskHandler)

    const { root, getByText } = renderScreen()

    let optionsDialog: ReactTestInstance

    await waitFor(() => {
      optionsDialog = root.findByProps({ name: 'dots-three-horizontal' })
    })

    await act(async () => {
      fireEvent(optionsDialog, 'press')
      jest.runAllTimers()
    })

    expect(showActionSheetWithOptions).toBeCalledTimes(1)
  })

  it('should display a delete confirmation dialog when clicking delete', async () => {
    const showActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions
    })

    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    server.use(getTaskHandler)

    const { root, getByText } = renderScreen()

    let optionsDialog: ReactTestInstance

    await waitFor(() => {
      optionsDialog = root.findByProps({ name: 'dots-three-horizontal' })
    })

    await act(async () => {
      fireEvent(optionsDialog, 'press')
      jest.runAllTimers()
    })

    const actionSheetCallback = showActionSheetWithOptions.mock.calls[0][1]
    const navigateMock = jest
      .spyOn(
        root.findByType(ViewTaskScreen).props.navigation as any,
        'navigate'
      )
      .mockImplementation()

    await act(async () => {
      actionSheetCallback(0)
    })

    await waitFor(() => {
      getByText('Are you sure you want to delete this task')
    })
  })

  it('should delete the task when clicking on the confirmation dialog delete button', async () => {
    const showActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions
    })

    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    const { handler: deleteTaskHandler } = createHandler(
      '/task/:id',
      'DELETE_SUCCESS'
    )

    server.use(getTaskHandler, deleteTaskHandler)

    const { root, queryByText } = renderScreen()

    let optionsDialog: ReactTestInstance

    await waitFor(() => {
      optionsDialog = root.findByProps({ name: 'dots-three-horizontal' })
    })

    await act(async () => {
      fireEvent(optionsDialog, 'press')
    })

    const actionSheetCallback = showActionSheetWithOptions.mock.calls[0][1]
    const navigateMock = jest
      .spyOn(
        root.findByType(ViewTaskScreen).props.navigation as any,
        'navigate'
      )
      .mockImplementation()

    await act(async () => {
      actionSheetCallback(0)
    })

    let deleteButton = root.findByProps({ title: 'Delete' })

    await act(async () => {
      fireEvent.press(deleteButton)
      jest.runAllTimers()
    })

    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith('Home Screen')
    expect(
      queryByText('Are you sure you want to delete this task')
    ).not.toBeOnTheScreen()
  })

  it('should stay with the modal open in case the delete fails', async () => {
    const showActionSheetWithOptions = jest.fn()
    jest.spyOn(ExpoActionSheet, 'useActionSheet').mockReturnValue({
      showActionSheetWithOptions
    })

    const { handler: getTaskHandler } = createHandler(
      '/task/:id',
      'GET_TASK_SUCCESSFULLY'
    )

    const { handler: deleteTaskHandler } = createHandler(
      '/task/:id',
      'DELETE_ERROR'
    )

    server.use(getTaskHandler, deleteTaskHandler)

    const { root, queryByText } = renderScreen()

    let optionsDialog: ReactTestInstance

    await waitFor(() => {
      optionsDialog = root.findByProps({ name: 'dots-three-horizontal' })
    })

    await act(async () => {
      fireEvent(optionsDialog, 'press')
    })

    const actionSheetCallback = showActionSheetWithOptions.mock.calls[0][1]
    const navigateMock = jest
      .spyOn(
        root.findByType(ViewTaskScreen).props.navigation as any,
        'navigate'
      )
      .mockImplementation()

    await act(async () => {
      actionSheetCallback(0)
    })

    let deleteButton = root.findByProps({ title: 'Delete' })

    await act(async () => {
      fireEvent.press(deleteButton)
      jest.runAllTimers()
    })

    expect(navigateMock).toHaveBeenCalledTimes(0)

    expect(
      queryByText('Are you sure you want to delete this task')
    ).toBeOnTheScreen()
  })
})
