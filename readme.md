# React Library Generator
[![](https://img.shields.io/npm/l/react-library-generator.svg)](https://github.com/jalalazimi/react-library-generator) [![](https://img.shields.io/node/v/react-library-generator.svg)](https://github.com/jalalazimi/react-library-generator) [![](https://img.shields.io/npm/v/react-library-generator.svg)](https://github.com/jalalazimi/react-library-generator)
> Powerful CLI for creating a React libraries

React library generator is a CLI that helps you to build a scaffold for your library. It's fully customizable, and you can determine what you want. Also, this CLI create documentation for your library and provide various test utilities.

<p align="center">
  <img src="https://unpkg.com/react-library-generator@0.1.5/assets/demo.svg">
</p>

## Features
- Simple to use CLI and fully customizable
- ES6 and Flow syntax support
- Testing (Jest, Ava, Enzyme)
- Different supported style languages (Sass, Less, PostCSS, CSS)
- Documentation (Docz)
- Rollup for Bundling
- Bundles es and cjs module formats
- Babel for Transpiling
- Source map creation
- Automatic code linting via esLint
- Supports peer-dependencies
- Protect your git branches with Husky
- Check Library name availability on NPM before generating

## Installation

```
npm i -g react-library-generator
```
```
yarn add global react-library-generator
```

## Usage

```
$ react-library-generator
```

## Library structure
The following file tree has represented the structure of the library. You can develop your component on the `src` folder and writes tests on the `tests` folders. 😄

At the moment, we use [Docz](https://www.docz.site/) for documentation and demo. but In the future, we provide other utilities such as Storybook for documentation.

<p align="center">
  <img src="https://unpkg.com/react-library-generator@0.1.7/assets/tree.png">
</p>

> Note! We don't intend to restrict you to this structure, and all parts can be changed.


## License
MIT © [Jalal Azimi](https://twitter.com/jalalazimi)
