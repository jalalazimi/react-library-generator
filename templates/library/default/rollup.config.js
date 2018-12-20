import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import url from 'rollup-plugin-url'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import progress from 'rollup-plugin-progress'
import flow from 'rollup-plugin-flow'

import pkg from './package.json'

export default {
	input: 'src/index',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		}
	],
	external: ['react', 'prop-types'],
	plugins: [
		url(),
		flow(),
		peerDepsExternal(),
		postcss({
			plugins: [autoprefixer],
			modules: true
		}),
		babel({
			exclude: 'node_modules/**',
			externalHelpers: true
		}),
		progress({
			clearLine: false // default: true
		}),
		commonjs()
	]
}
