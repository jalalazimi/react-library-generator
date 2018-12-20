// @flow
import React from 'react'
import './style.scss'

type Props = {
	title: string
}

const Component = ({ title = 'React Library Generator' }: Props) => (
	<div className="component">
		<h1>Welcome to {title}</h1>
	</div>
)

export default Component
