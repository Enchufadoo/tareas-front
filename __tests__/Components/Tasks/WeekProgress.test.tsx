import React from 'react'
import { renderWithProviders } from '@/Testing/TestUtil'
import WeekProgress from '@/Components/Tasks/WeekProgress'
import { Entypo, Text } from '@/Components/Nativewind/React'

describe('WeekProgress', () => {
  it('Render the row without any progress', async () => {
    const { root } = renderWithProviders(
      <WeekProgress
        progress={[false, false, false, false, false, false, false]}
        isLastElement={false}
      />
    )

    const marks = root.findAllByType(Entypo)
    const emptyPositions = root.findAllByType(Text)

    expect(marks).toHaveLength(0)
    expect(emptyPositions).toHaveLength(7)
  })

  it('Render the row with 3 days of progress', async () => {
    const { root } = renderWithProviders(
      <WeekProgress
        progress={[false, false, false, false, true, true, true]}
        isLastElement={false}
      />
    )

    const marks = root.findAllByType(Entypo)
    const emptyPositions = root.findAllByType(Text)

    expect(marks).toHaveLength(3)
    expect(emptyPositions).toHaveLength(4)
  })
})
