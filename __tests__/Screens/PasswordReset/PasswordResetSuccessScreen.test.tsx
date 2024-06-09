import React from 'react'

import { mockedNavigate, renderWithProviders } from '@/Testing/TestUtil'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

import '@testing-library/jest-native/extend-expect'
import { expect } from '@jest/globals'
import Button from '@/Components/Base/Button/Button'
import PasswordResetSuccessScreen from '@/Screens/PasswordReset/PasswordResetSuccessScreen'

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <PasswordResetSuccessScreen />
    </NavigationContainer>
  )
}

describe('PasswordResetSuccessScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the screen', async () => {
    const { root, getByText } = renderScreen()

    expect(getByText('Password Successfully Saved')).toBeVisible()
    expect(root.findAllByType(Button)).toHaveLength(1)
  })

  it('Should enable the submit button when all field are valid', async () => {
    let navigate = expect(mockedNavigate)

    const { root, store } = renderScreen()

    const submitButton = root.findByProps({ title: 'Continue to Login' })

    await act(async () => {
      fireEvent(submitButton, 'press')
    })

    await waitFor(async () => {
      navigate.toHaveBeenCalledTimes(1)
      navigate.toHaveBeenCalledWith('Login Screen')
    })
  })
})
