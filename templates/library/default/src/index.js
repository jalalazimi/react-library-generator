import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const propTypes = {
	title: PropTypes.string.isRequired
}

export default function MyComponent (props) {
	const { title } = props
	return (
		<div className="my-component">
			<h1>{title}</h1>
			<p>This is an example component.</p>
		</div>
	)
}

MyComponent.propTypes = propTypes
