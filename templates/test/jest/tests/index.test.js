//@flow
import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Component from '../src'

configure({ adapter: new Adapter() })

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Component/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})
