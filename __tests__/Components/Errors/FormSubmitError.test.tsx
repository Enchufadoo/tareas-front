import React from 'react'
import FormSubmitError from '@/Components/Errors/FormSubmitError'
import { renderWithProviders } from '@/Testing/TestUtil'

describe('FormSubmitError', () => {
  it('renders without crashing', () => {
    const { getByText, toJSON } = renderWithProviders(
      <FormSubmitError header={'test header'} subheader={'test subheader'} />
    )

    expect(getByText('test header')).toBeTruthy()
    expect(getByText('test subheader')).toBeTruthy()
  })
})
