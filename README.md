<h1 text-align="center">Automation-Testing-lifecycle</h1>

The software automation testing lifecycle using Playwright with TypeScript generally follows a structured process that ensures comprehensive test coverage, efficient test execution, and reliable results. Here’s an outline of the lifecycle:

### 1. **Test Planning**
   - **Requirement Analysis:** Understand the application under test (AUT) and gather all the functional and non-functional requirements.
   - **Test Strategy Development:** Define the overall testing approach, including the scope, objectives, resources, timelines, and deliverables.
   - **Tool Selection:** Choose Playwright as the automation tool, and TypeScript as the programming language for writing test scripts.

### 2. **Test Design**
   - **Test Case Design:** Identify and design the test cases based on the requirements. Categorize them into different test suites (e.g., smoke tests, regression tests).
   - **Test Data Preparation:** Create or identify the necessary test data required for executing the test cases.
   - **Framework Setup:** Set up a test automation framework with Playwright and TypeScript. This might include setting up folder structures, configuration files, and dependencies (`package.json`).
   - **Test Environment Setup:** Configure the environment where tests will be executed, which might involve setting up browsers, devices, or virtual machines.

### 3. **Test Script Development**
   - **Test Script Writing:** Write the test scripts in TypeScript using Playwright’s API. This involves creating functions, page objects, and reusable components to make scripts maintainable.
   - **Test Script Review:** Review the test scripts to ensure they are aligned with the test cases and follow best coding practices.
   - **Test Script Versioning:** Commit the test scripts to a version control system like GitHub, ensuring that changes are tracked.

### 4. **Test Execution**
   - **Test Execution Planning:** Define the test execution strategy, including the sequence of test runs, test environments, and any parallel execution strategies.
   - **Trigger Test Execution:** Run the tests using Playwright’s CLI or integrate the execution with CI/CD pipelines (e.g., GitHub Actions, CircleCI).
   - **Monitor Execution:** Monitor the test runs to identify any issues during execution, such as environment failures or flaky tests.

### 5. **Test Reporting**
   - **Generate Reports:** After test execution, generate detailed reports using tools like Allure or Playwright’s built-in reporting capabilities. These reports should include test case results, screenshots, logs, and error traces.
   - **Analyze Results:** Analyze the results to identify patterns of failure, test coverage gaps, and areas for improvement.

### 6. **Test Maintenance**
   - **Test Script Maintenance:** Regularly update the test scripts to accommodate changes in the application under test, such as new features, UI changes, or updates in dependencies.
   - **Handle Flaky Tests:** Identify and fix flaky tests to ensure consistent test results.
   - **Refactor Test Scripts:** Optimize and refactor test scripts for better performance and maintainability.

### 7. **Continuous Integration and Continuous Testing**
   - **CI/CD Integration:** Integrate the Playwright tests into a CI/CD pipeline to ensure that tests run automatically with every code change, providing quick feedback to the development team.
   - **Continuous Monitoring:** Implement continuous monitoring of the test results to quickly detect any issues in the automation process or the application.
   - **Integration With Slack/Teams:** After completing continuous integration, a report summary is sent to Slack or Teams using an incognito webhook with an attached report URL.

   ![Slack report](image-1.png)
   ![Teams report](image-2.png)
   

### 8. **Test Closure**
   - **Test Summary Report:** Prepare a final test summary report that includes key metrics like test coverage, defect density, and pass/fail rates.
   - **Test Artifacts Archiving:** Archive all test artifacts, including test scripts, reports, logs, and screenshots, for future reference.
   - **Lessons Learned:** Conduct a retrospective to discuss what went well, what didn’t, and how the automation process can be improved in future cycles.

### 9. **Feedback and Improvement**
   - **Continuous Feedback:** Gather feedback from stakeholders, developers, and testers to continuously improve the test automation process.
   - **Process Improvement:** Identify areas of improvement in the test automation lifecycle, such as enhancing the framework, optimizing test execution time, or increasing test coverage.

This lifecycle is iterative and should be revisited regularly to ensure the automation process evolves with the application and the team’s needs.




<h1 text-align="center">Playwright-Project-Setup</h1>

## Introduction

Playwright-Framework-Template - This project is based on Microsoft Playwright, which enables reliable end-to-end testing, Web testing.


## Features

- Easy to Configure
- Auto wait for all elements & checks
- Generate HTML report
- Generate detailed trace file which helps to debug
- Generate snapshot for each step
- Record video for test case execution
- Support Web automation with support for chrome, Edge, Firefox and Safari
- Dynamic data handling using external JSON files
- Support taking screenshots
- Support Serial and Parallel execution
- Environment configuration using .env files

## Tech Stack/Libraries Used

- [PlayWright](https://playwright.dev/) - for web automation
- [ESLint](https://eslint.org/) - pinpoint issues and guide you in rectifying potential problems in both JavaScript and TypeScript.
- [Prettier](https://prettier.io/) - for formatting code & maintain consistent style throughout codebase
- [Dotenv](https://www.dotenv.org/) - to load environment variables from .env file


## Getting Started

## Project Structure
**Project Structure**

- `helper`
    - `/web/webHelper.ts` contains functions for interacting with browser
- `tests` contains utility functions
    - `web` place to web tests
- `utils` contains utility functions
    - `config` contains config files
    - `report` contains report function files
    - `dataStore.js` acts as a in-memory data store. It is used to save data that needs to be shared between different test case
- `test-results` contains test results

### Prerequisite

- `nodejs`: Download and install Node JS from
  > `https://nodejs.org/en/download`
- `Visual Studio Code/Aqua/IntelliJ`: Download and install code editor

### Installation

- - clone the repo using below URL
    
    > 
    > 
- If you want to run this on your local machine, git clone the repo to local. In the main directory run the below commands. This will install playwright dependencies on your machine.:
    
    > npm install
    > 
- For first time installation use below command to download required browsers:
    
    > npx playwright install
    > 

### Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" "dev"`Test Cases are present in "tests" folder`:
    1. If you want to execute test in Staging then run this command
        - `npm run test:stg`
    2. If you want to execute test in Dev then run this command
        - `npm run test:dev`
    3. If you want to execute test in Prod then run this command
        - `npm run test:prod`


### Run Test

**Usage**

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" or "dev", `Test Cases are present in "tests" folder`:
- `npm run test:dev (name-of-file.spec.ts)`
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.chrome.ts` to run test in ui mode on chrome browser
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.firefox.ts` to run test in ui mode on firefox browser
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.edge.ts` to run test in ui mode on edge browser




1. assertEqualSoft
Allows soft assertions, enabling tests to continue running even if some assertions fail, useful for comprehensive validation in a single test run.
2. authSetup
Simplifies authentication setup by managing user sessions, tokens, or credentials for automated login workflows.
3. clickHelper
Provides enhanced click handling with retries or specific conditions, reducing flakiness in tests due to timing issues.
4. waitForSelector
Waits for an element to appear, ensuring synchronization between the UI and automation script.
5. waitForLocator
A robust alternative to waitForSelector, allowing dynamic interactions with more complex locators.
6. ifElseClick
Adds conditional logic for clicking elements based on their visibility or state, improving test adaptability.
7. dblClick
Simplifies double-click operations, particularly useful for interacting with elements requiring this action.
8. waitForAllVideoToLoad
Ensures that all video resources are fully loaded before proceeding, critical for multimedia-heavy applications.
9. assertTextHelper
Validates text content in a more streamlined manner, improving readability and maintainability of test scripts.
10. inputTextHelper
Simplifies text input with error handling, making forms and data entry testing more reliable.
11. verifyElementColor
Verifies CSS color properties, useful for UI/UX consistency checks.
12. uploadImage / uploadVideo
Streamlines file uploads by automating file chooser dialogs, reducing manual setup for test environments.
13. clickActiveBtn
Ensures only active or enabled buttons are clicked, preventing invalid interactions.
14. waitForNetworkIdle
Waits until no network activity occurs, ensuring all asynchronous operations are complete.
15. waitForTimeout
Introduces a pause in execution, useful for debugging or handling specific timing requirements.
16. waitForAllResourceLoad
Waits for all page resources to load, ensuring the page is fully rendered before interactions.
17. waitForButtonEnabled
Ensures buttons are enabled before interacting, reducing test failures due to premature actions.
18. waitForPageApiLoad
Verifies API responses are received before proceeding, crucial for validating data-driven components.
19. verifyBackgroundVideo
Confirms that a background video is loaded and playing correctly, critical for video-dependent features.
20. compareFullPageScreenshot
Compares full-page screenshots for visual regression, ensuring UI changes do not introduce unintended design issues.
21. compareElementScreenshot
Focuses on specific UI elements for precise visual regression testing.
22. waitForButtonToBeEnabled
Ensures buttons are interactable before performing actions, improving reliability in form and workflow tests.
23. copyURLToClipboard
Automates the process of copying URLs, useful for testing share functionality.
24. clickNestedElement
Enables interactions with deeply nested elements, simplifying complex DOM structures.
25. handleCheckBox
Automates checkbox interactions with state validation (checked/unchecked).
26. expectToBeVisible / expectNotToBeVisible
Provides readable, reusable assertions for verifying element visibility states.
27. closeBrowserIfOpen
Closes browser instances if already open, reducing conflicts during multiple test executions.
28. downloadFile
Automates file download validation, ensuring correct content and file handling workflows.


General Benefits:
Consistency: All helpers ensure consistent implementation of repetitive actions across tests.
Readability: Test scripts become more readable and easier to understand.
Reusability: Modular helpers allow code reuse, reducing duplication and improving maintainability.
Flakiness Reduction: Many helpers address timing and synchronization issues, ensuring stable test runs.
Scalability: Simplified scripts make scaling test coverage across scenarios and environments easier.