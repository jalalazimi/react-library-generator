import { css } from 'docz-plugin-css'
import externalLinks from 'remark-external-links'

export default {
	title: 'React Library Generator',
	description: 'React Library Generator',
	mdPlugins: [externalLinks.default],
	menu: [
		'Home'
	],
	plugins: [
		css({
			preprocessor: 'sass',
			cssmodules: true,
		}),
	],
}
