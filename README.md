# SimplyBe Automation

## Description

Task to automate the SimplyBe application using Cypress.

## Installation

Ensure you have Node.js installed on your system. You can download Node.js from [here](https://nodejs.org/).

To set up the project, follow these steps:

#### 1. Clone the repository:

   ```bash
   git clone https://github.com/abubakarafzal/Simplybe.git
```

#### 2. Navigate to the project directory:

   ```bash
   cd SimplyBePractice
```

#### 3. Install the required dependencies:

   ```bash
   npm install
```

#### 4. Dependencies

This project uses several dependencies to facilitate development and testing:

- `concurrently`: For running multiple scripts at once.

- `cypress`: Testing framework

- `cypress-parallel`: For running Cypress tests in parallel.

- `prettier`: for code formatting

- `typescript`: Programming Language

# Scripts

This project includes several scripts that can be run from the command line:

- `npm run cypress:open`: Opens the Cypress GUI for interactive test development.
- `npm run cypress:run`: Runs Cypress tests in a headless Chrome browser, suited for CI environments.
- `npm run prettier`: Formats TypeScript files in the `cypress` directory.
## Usage

To start the server and open the application, run:

```bash
npm start
```

To format your test scripts to ensure code consistency:

```bash
npm run prettier
```

To run tests interactively:

```bash
npm run cypress:open
```

For automated test execution headless:

```bash
npm run cypress:run
```



To run the tests concurrently in parallel, which is ideal for larger test suites:

```bash
npm run cy:parallel
```

