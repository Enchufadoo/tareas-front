import React from 'react'
import { screen } from '@testing-library/react-native'
import Badge from '@/Components/TasksList/Badge'
import { renderWithProviders } from '@/Testing/TestUtil'

describe('Badge', () => {
  it('renders correctly when selected', () => {
    renderWithProviders(<Badge count={3} selected={true} />)
    const countElement = screen.getByText('3')

    expect(countElement).toBeTruthy()
  })

  it('renders correctly when not selected', () => {
    renderWithProviders(<Badge count={3} selected={false} />)
    const countElement = screen.getByText('3')
    expect(countElement).toBeTruthy()
  })
})
