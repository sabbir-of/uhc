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






Writing Tests in Playwright with TypeScript Using POM and Helper Functions

🔧 Key Principles:

Encapsulation:

Use the Page Object Model (POM) to encapsulate locators like dealManagement in LoanPage for modularity and reusability.
Helper Functions:

Delegate actions like click, wait, and assertions to helper functions for better readability and maintainability.
Descriptive Error Messages:

Provide contextual error messages in helper functions ( Deal Management button is not visible) to improve debugging.
Type Safety:

Leverage TypeScript for strong typing to reduce runtime errors and enhance confidence in test code.



📝 Implementation Guide

1. Page Object Example

Encapsulate locators in a dedicated page object:

readonly dealManagement = page.locator(`[title="Deal Management"]`);

 

2. Steps File Example

Write reusable test steps using helper functions:

Then('click on the Deal Management button', async ({ loanPage }) => {

  await Helper.clickHelper(loanPage.dealManagement, { errorMessage: 'Deal Management button is not visible' });

});

 

3. Feature File Example

Structure test scenarios using Gherkin syntax:

@deal_management @loan

Scenario Outline: The user should see a button at the top of the page labeled "Deal Management"

  Given navigates to the Loan Route

  When the user sees a button at the top of the page labeled "Deal Management"

  Then clicks on the Deal Management button

 



🚀 Benefits

Maintainability:

Update locators in one place (POM) if the UI changes.
Reusability:

Centralized locators and helper functions reduce redundancy.
Readability:

Steps and helpers make tests easy to read and follow.
Error Debugging:

Custom error messages improve debugging.
Scalability:

Structured code adapts to growing test suites.
Separation of Concerns:

Tests focus on logic; helpers handle Playwright-specific details.