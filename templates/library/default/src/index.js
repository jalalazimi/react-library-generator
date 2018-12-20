import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const propTypes = {
	title: PropTypes.string.isRequired
}

export default function Component (props) {
	const { title } = props;
	return (
		<div className="component">
			<h1>Welcome to {title}</h1>
		</div>
	)
}

Component.defaultProps = {
	name: 'React Library Generator'
};

Component.propTypes = propTypes
