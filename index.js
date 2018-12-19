#!/usr/bin/env node
'use strict'

const semver = require('semver')
const process = require('process')

//  Check Node version
if (semver.satisfies(process.versions.node, '>=8')) {
  require('./bin')
} else {
  console.log('Incorrect Node version')
  process.exit()
}
