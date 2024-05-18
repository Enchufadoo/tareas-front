import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

describe('<App />', () => {
  it('has 1 child', () => {
    const component = renderer.create(<App />).toJSON()
    if ('children' in component) {
      expect(component.children.length).toBe(1)
    }
  })

  it('renders correctly', () => {
    const component = renderer.create(<App />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
