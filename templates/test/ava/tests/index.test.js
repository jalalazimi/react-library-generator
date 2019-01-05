import test from 'ava'
import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Component from '../src'

configure({ adapter: new Adapter() })

test('can use ava', (t) => {
	t.pass()
})

test('rendered div element', (t) => {
	const wrapper = shallow(<Component/>)
	t.is(wrapper.type(), 'div')
})
