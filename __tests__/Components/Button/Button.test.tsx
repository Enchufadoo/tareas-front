import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { Text } from '@/Components/Nativewind/React'
import { ActivityIndicator } from 'react-native'
import { renderWithProviders } from '@/Testing/TestUtil'

describe('Button', () => {
  it('Renders correctly', () => {
    const { getByText } = renderWithProviders(
      <Button
        size={ButtonSize.medium}
        theme={ButtonTheme.primary}
        title={'button title'}
      />
    )

    getByText('button title')
  })

  it('Call the on press prop correctly', () => {
    const onPressCallback = jest.fn()

    const { getByText } = renderWithProviders(
      <Button
        size={ButtonSize.medium}
        theme={ButtonTheme.primary}
        title={'button title'}
        onPress={onPressCallback}
      />
    )

    const button = getByText('button title')
    fireEvent.press(button)
    expect(onPressCallback).toHaveBeenCalled()
  })

  it('If button is disabled press doesnt work', () => {
    const onPressCallback = jest.fn()

    const { getByText } = renderWithProviders(
      <Button
        size={ButtonSize.medium}
        theme={ButtonTheme.primary}
        title={'button title'}
        onPress={onPressCallback}
        disabled={true}
      />
    )

    const button = getByText('button title')
    fireEvent.press(button)
    expect(onPressCallback).not.toHaveBeenCalled()
  })

  it('The right icon renders correctly', () => {
    const { getByText } = renderWithProviders(
      <Button
        size={ButtonSize.medium}
        theme={ButtonTheme.primary}
        title={'button title'}
        icon={<Text>Right Icon Test</Text>}
      />
    )

    const icon = getByText('Right Icon Test')
    expect(icon).toBeTruthy()
  })

  it('The button progress renders correctly', async () => {
    const { toJSON, getByTestId, root, UNSAFE_queryByType } =
      renderWithProviders(
        <Button
          size={ButtonSize.medium}
          theme={ButtonTheme.primary}
          title={'button title'}
          loading={true}
        />
      )

    expect(UNSAFE_queryByType(ActivityIndicator)).toBeTruthy()
  })
})
