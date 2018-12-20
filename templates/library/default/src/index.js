// @flow
import React from 'react'
import './style.scss'

const PropTypes = {
	title: Number
}

const Component = ({ title = 'React Library Generator' }: PropTypes) => (
	<div className="component">
		<h1>Welcome to {title}</h1>
	</div>
)

export default Component
