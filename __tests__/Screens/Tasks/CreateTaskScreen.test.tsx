import React from 'react'
import { mockedNavigate, renderWithProviders } from '@/Testing/TestUtil'

import { NavigationContainer } from '@react-navigation/native'
import '@testing-library/jest-native/extend-expect'
import { createHandler, server } from '@/Testing/ApiMocks'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { isInputInvalid, isInputValid } from '@/Testing/InputValidation'
import { ReactTestInstance } from 'react-test-renderer'
import CreateTaskScreen from '@/Screens/Tasks/CreateTaskScreen'
import { expect } from '@jest/globals'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <CreateTaskScreen />
    </NavigationContainer>
  )
}

describe('CreateTaskScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { handler, response } = createHandler(
      '/task/store/data',
      'SUCCESSFUL'
    )
    server.use(handler)

    const { getByText } = renderScreen()

    await waitFor(() => {
      getByText('New Task')
    })
  })

  it.each(['', 'bb', 'a', 'A'.repeat(31)])(
    'should reject an invalid title',
    async (title) => {
      const { handler, response } = createHandler(
        '/task/store/data',
        'SUCCESSFUL'
      )
      server.use(handler)
      let titleInput: ReactTestInstance = null

      const { root, getByText } = renderScreen()

      await waitFor(async () => {
        titleInput = root.findByProps({ placeholder: 'Title' })
      })

      await act(async () => {
        fireEvent(titleInput, 'changeText', title)
      })

      isInputInvalid(titleInput)
    }
  )

  it('should create a task', async () => {
    const { handler: dataHandler } = createHandler(
      '/task/store/data',
      'SUCCESSFUL'
    )

    const { handler: storeHandler } = createHandler(
      '/task',
      'SUCCESSFULLY_SAVED'
    )

    server.use(dataHandler, storeHandler)

    let descriptionInput: ReactTestInstance = null
    let titleInput: ReactTestInstance = null
    let submitButton: ReactTestInstance = null

    const { root, getByText } = renderScreen()

    await waitFor(async () => {
      descriptionInput = root.findByProps({ placeholder: 'Description' })
      titleInput = root.findByProps({ placeholder: 'Title' })
      submitButton = root.findByProps({ title: 'Create Task' })
    })

    await act(async () => {
      fireEvent(titleInput, 'changeText', 'some title')
      fireEvent(descriptionInput, 'changeText', 'some description')
      fireEvent(submitButton, 'press')
    })

    isInputValid(descriptionInput)
    isInputValid(titleInput)

    await waitFor(async () => {
      let navigate = expect(mockedNavigate)

      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Home Screen')
    })
  })

  it.each(['bbf', 'a', 'A'.repeat(3001)])(
    'should reject an invalid description',
    async (title) => {
      const { handler, response } = createHandler(
        '/task/store/data',
        'SUCCESSFUL'
      )
      server.use(handler)
      let descriptionInput: ReactTestInstance = null

      const { root, getByText } = renderScreen()

      await waitFor(async () => {
        descriptionInput = root.findByProps({ placeholder: 'Description' })
      })

      await act(async () => {
        fireEvent(descriptionInput, 'changeText', title)
      })

      isInputInvalid(descriptionInput)
    }
  )
})
