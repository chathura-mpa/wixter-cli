# Wixter CLI

Wixter is a command-line interface (CLI) tool for generating React components, custom hooks, and API functions quickly and easily.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [Dashboard](#dashboard)
  - [API](#api)
- [Examples](#examples)
- [License](#license)

## Installation

To use Wixter add it to your project as a dev dependancy:

```bash
yarn add -D git@github.com-mpa:chathura-mpa/wixter-cli.git
```
## Usage
After installation, you can use the Wixter CLI by running the following command:
```bash
wixter <command> [options]
```
## Commands
##### Dashboard
Generate React components and custom hooks.
```bash
wixter dashboard [options]
```
###### Options:
-	`-c, --component <name>`:  Create a new component with the specified name (*must be in* **PascalCase**).
-	`-h, --hook <name>`: Create a new custom hook with the specified name (*must be in* **PascalCase**).

##### API
Generate API functions.
```bash
wixter api [options]
```
###### Options:
-	`-f, --function <name>`: Create a new API function with the specified name..

## Examples
**Generate a React Component**
To create a new component named MyComponent, run:
```bash
wixter dashboard --component MyComponent
```

**Generate a Custom Hook**
To create a new custom hook named useMyHook, run:
```bash
wixter dashboard --hook MyHook
```

**Generate an API Function**
To create a new API function named myFunction, run:
```bash
wixter api --function myFunction
```

## License
MIT
