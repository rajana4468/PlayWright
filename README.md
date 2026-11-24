# Playwright -- Beginner-Friendly Guide

A practical reference for learning Playwright, writing browser
automation tests, and preparing for interviews.

> **Language used in examples:** JavaScript\
> **Test framework:** Playwright Test\
> **Prerequisites:** Basic JavaScript knowledge and Node.js installed on
> your computer.

------------------------------------------------------------------------

## 1. What is Playwright?

**Playwright is an open-source browser automation tool used to test web
applications.** It lets you write scripts that perform actions in a
browser---such as opening a website, clicking buttons, entering text,
selecting options, and checking whether the application behaves as
expected.

Playwright can automate Chromium (Chrome and Edge), Firefox, and WebKit
(the browser engine used by Safari). It supports JavaScript, TypeScript,
Python, Java, and .NET.

### Simple example

``` javascript
const { test, expect } = require('@playwright/test');

test('check page title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
```

This test opens a website and checks its page title.

## 2. Benefits of Playwright

1.  **Cross-browser testing** -- Run tests on Chromium, Firefox, and
    WebKit.
2.  **Auto-waiting** -- Playwright waits for elements to become
    actionable before performing actions, reducing many timing-related
    failures.
3.  **Reliable locators** -- Provides user-facing locators such as
    `getByRole()`, `getByText()`, and `getByLabel()`.
4.  **Parallel execution** -- Run tests in parallel to reduce overall
    execution time.
5.  **Multiple browser contexts** -- Create isolated sessions, useful
    for testing different users or roles.
6.  **Network interception** -- Monitor, modify, or mock network
    requests and responses.
7.  **Screenshots and videos** -- Capture evidence when tests run or
    fail.
8.  **Trace Viewer** -- Inspect test actions, screenshots, DOM
    snapshots, and network activity to debug failures.
9.  **Mobile emulation** -- Emulate mobile devices, screen sizes, and
    touch capabilities.
10. **API testing** -- Send API requests and validate responses using
    the Playwright API request functionality.
11. **No separate driver installation in normal use** -- Playwright
    manages compatible browser binaries through its installation
    commands.
12. **CI/CD support** -- Run automated tests in build and deployment
    pipelines.

## 3. How is Playwright different from other tools?

  ------------------------------------------------------------------------------
  Feature           Playwright        Selenium           Cypress
  ----------------- ----------------- ------------------ -----------------------
  Main purpose      Browser           Browser automation Web application
                    automation and                       end-to-end testing
                    end-to-end                           
                    testing                              

  Browser engines   Chromium,         Many browsers      Mainly Chromium-family
                    Firefox, WebKit   through browser    browsers, plus Firefox
                                      drivers            and WebKit support with
                                                         differences

  Languages         JS/TS, Python,    Many languages     JavaScript/TypeScript
                    Java, .NET                           

  Auto-waiting      Built-in          Usually requires   Automatic retrying and
                    actionability     explicit waits or  waiting
                    checks and        suitable wait      
                    web-first         strategies         
                    assertions                           

  Parallel testing  Supported by      Usually configured Supported through
                    Playwright Test   through the test   Cypress Cloud and other
                    workers           framework/grid     setups

  Multiple isolated Browser contexts  Separate browser   Test isolation and
  sessions                            sessions/windows   browser contexts are
                                                         managed differently

  Network control   Built-in request  Possible through   Built-in network
                    routing and       browser/proxy or   stubbing and spying
                    mocking           other tools        

  Debugging         Inspector, Trace  Depends on browser Interactive Test
                    Viewer,           and test framework Runner, screenshots,
                    screenshots,                         videos
                    videos                               
  ------------------------------------------------------------------------------

### In simple words

-   **Playwright vs Selenium:** Playwright includes modern waiting,
    browser-context isolation, tracing, and network tools. Selenium has
    a longer history, broad language support, and a large ecosystem.
-   **Playwright vs Cypress:** Both offer automatic waiting and strong
    developer experiences. Playwright supports multiple browser engines
    and browser contexts, and its test runner can execute tests in
    parallel across workers. Cypress has a distinctive interactive
    runner and its own execution model.

**Which one should you choose?** It depends on the application, team
skills, browser requirements, existing framework, and CI/CD setup. No
tool is best for every project.

## 4. Install and set up Playwright

### Step 1: Install Node.js

Install the LTS version of Node.js from <https://nodejs.org/>.

Check that Node.js and npm are installed:

``` bash
node --version
npm --version
```

### Step 2: Create a project folder

``` bash
mkdir playwright-learning
cd playwright-learning
```

### Step 3: Initialize a Node.js project

``` bash
npm init -y
```

This creates a `package.json` file.

### Step 4: Install Playwright Test

``` bash
npm init playwright@latest
```

The setup wizard asks questions such as JavaScript or TypeScript, test
folder name, and whether to add a GitHub Actions workflow. Follow the
prompts. It also installs the required Playwright packages and browser
binaries as selected by the setup.

If you already have a Node.js project, you can install the test package
with:

``` bash
npm install --save-dev @playwright/test
npx playwright install
```

### Step 5: Run the sample tests

``` bash
npx playwright test
```

------------------------------------------------------------------------

## 5. Important Playwright commands

Run these commands from the root folder of your Playwright project.

### Installation and setup

  Command                                     Purpose
  ------------------------------------------- ----------------------------------------
  `npm init -y`                               Create a Node.js project
  `npm init playwright@latest`                Set up a Playwright Test project
  `npm install --save-dev @playwright/test`   Install Playwright Test
  `npx playwright install`                    Install the default supported browsers
  `npx playwright install chromium`           Install Chromium
  `npx playwright install firefox`            Install Firefox
  `npx playwright install webkit`             Install WebKit
  `npx playwright --version`                  Display the Playwright CLI version

### Running tests

  -------------------------------------------------------------------------------
  Command                                     Purpose
  ------------------------------------------- -----------------------------------
  `npx playwright test`                       Run all tests

  `npx playwright test tests/login.spec.js`   Run one test file

  `npx playwright test -g "login"`            Run tests whose title matches
                                              `login`

  `npx playwright test --headed`              Run with the browser window visible

  `npx playwright test --ui`                  Open Playwright UI Mode

  `npx playwright test --project=chromium`    Run a configured project

  `npx playwright test --workers=2`           Run with two workers

  `npx playwright test --retries=1`           Retry failed tests once

  `npx playwright test --repeat-each=3`       Run each test three times

  `npx playwright test --debug`               Run in debug mode

  `npx playwright test --last-failed`         Run tests that failed in the
                                              previous run
  -------------------------------------------------------------------------------

### Reports and debugging

  -------------------------------------------------------------------------------------
  Command                                           Purpose
  ------------------------------------------------- -----------------------------------
  `npx playwright show-report`                      Open the HTML report

  `npx playwright show-trace trace.zip`             Open a saved trace

  `npx playwright test --trace on`                  Record a trace for every test run

  `npx playwright test --trace retain-on-failure`   Retain traces for failed tests

  `npx playwright test --screenshot on`             Capture screenshots for tests

  `npx playwright test --video on`                  Record videos for tests
  -------------------------------------------------------------------------------------

The exact report, trace, screenshot, and video output depends on your
Playwright configuration. `trace: 'on-first-retry'` is a common
configuration for CI runs.

### Code generation

``` bash
npx playwright codegen https://example.com
```

Opens a browser and the Playwright Inspector. Actions you perform in the
browser are turned into suggested code. Review and improve the generated
code before using it in a test.

------------------------------------------------------------------------

## 6. Basic Playwright code examples

Assume this test file is named `tests/basic.spec.js`.

### 6.1 Import `test` and `expect`

``` javascript
const { test, expect } = require('@playwright/test');
```

-   `test` is used to define a test.
-   `expect` is used to verify expected results.

### 6.2 Open a website

``` javascript
test('open website', async ({ page }) => {
  await page.goto('https://example.com');
});
```

### 6.3 Locators

Locators identify elements on a page. Prefer locators based on
accessible roles, labels, and user-visible text when possible.

``` javascript
page.getByRole('button', { name: 'Login' });
page.getByText('Welcome');
page.getByLabel('Email');
page.getByPlaceholder('Enter email');
page.getByTestId('submit-button');
page.locator('#username');       // CSS ID
page.locator('.login-button');   // CSS class
page.locator('input[name="email"]');
```

### 6.4 Common actions

``` javascript
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Password').fill('password123');
await page.getByLabel('Remember me').check();
await page.getByLabel('Remember me').uncheck();
await page.getByLabel('Country').selectOption('India');
await page.getByText('Continue').hover();
await page.getByRole('button', { name: 'Save' }).dblclick();
await page.locator('#search').press('Enter');
```

### 6.5 Assertions

Assertions check whether the actual result matches the expected result.

``` javascript
await expect(page).toHaveTitle('Dashboard');
await expect(page).toHaveURL(/dashboard/);
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
await expect(page.getByRole('button', { name: 'Delete' })).toBeDisabled();
await expect(page.getByLabel('Email')).toHaveValue('user@example.com');
await expect(page.getByText('Error')).toHaveCount(0);
```

### 6.6 Handling multiple matching elements

Use `count()`, `first()`, `last()`, and `nth()` when a locator matches
multiple elements.

``` javascript
const cards = page.locator('.card');

const totalCards = await cards.count();
console.log(totalCards);

await cards.first().click();
await cards.last().click();
await cards.nth(2).click(); // Index starts at 0, so 2 means the third card.
```

A useful pattern for looping through elements:

``` javascript
const cards = page.locator('.card');
const totalCards = await cards.count();

for (let i = 0; i < totalCards; i++) {
  console.log(await cards.nth(i).innerText());
}
```

### 6.7 Waits

Playwright automatically waits for many actions and assertions. Prefer
locator actions and web-first assertions instead of fixed delays.

``` javascript
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('Submitted successfully')).toBeVisible();
```

Use an explicit wait only when there is a specific reason:

``` javascript
await page.waitForURL('**/dashboard');
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(2000); // Fixed delay; avoid in normal tests.
```

### 6.8 Dropdowns

For a standard HTML `select` element:

``` javascript
await page.locator('#country').selectOption({ label: 'India' });
```

For a custom dropdown, click it and then select the visible option:

``` javascript
await page.getByRole('combobox', { name: 'Country' }).click();
await page.getByRole('option', { name: 'India' }).click();
```

### 6.9 Alerts and dialogs

``` javascript
page.on('dialog', async dialog => {
  console.log(dialog.message());
  await dialog.accept();
});
```

To dismiss a dialog, use `await dialog.dismiss()` instead.

### 6.10 Frames / iframes

``` javascript
const frame = page.frameLocator('#payment-frame');
await frame.getByLabel('Card number').fill('4111111111111111');
```

### 6.11 New tab or popup

``` javascript
const pagePromise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'Open details' }).click();
const newPage = await pagePromise;

await expect(newPage).toHaveURL(/details/);
```

### 6.12 Screenshots

``` javascript
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ path: 'full-page.png', fullPage: true });
```

### 6.13 Upload and download files

``` javascript
await page.locator('input[type="file"]').setInputFiles('files/sample.pdf');

const downloadPromise = page.waitForEvent('download');
await page.getByRole('button', { name: 'Download' }).click();
const download = await downloadPromise;
await download.saveAs('downloads/sample.pdf');
```

Make sure the destination folder exists before saving a file.

### 6.14 API request example

``` javascript
test('check API response', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.id).toBe(1);
});
```

------------------------------------------------------------------------

## 7. Browser, context, and page

These three terms are important in Playwright.

-   **Browser:** The browser instance, such as Chromium, Firefox, or
    WebKit.
-   **Browser context:** An isolated browser session. Contexts have
    separate cookies and storage.
-   **Page:** A tab or popup inside a browser context.

Typical relationship:

``` text
Browser
  └── Browser Context
        ├── Page 1 (Tab 1)
        └── Page 2 (Tab 2)
```

In Playwright Test, the `page` fixture is provided automatically.
Playwright Test manages the browser and context fixtures for you in the
usual test setup.

------------------------------------------------------------------------

## 8. Common Playwright concepts

  -----------------------------------------------------------------------
  Concept                             Meaning
  ----------------------------------- -----------------------------------
  Test                                One individual automated test

  Test suite                          A group of related tests, commonly
                                      created with `test.describe()`

  Locator                             A way to find an element on a page

  Assertion                           A check that verifies the expected
                                      result

  Fixture                             Reusable setup or objects provided
                                      to a test, such as `page`

  Hook                                Code that runs at a defined point,
                                      such as `beforeEach`

  Browser context                     An isolated browser session

  Trace Viewer                        A tool for inspecting test
                                      execution and failures

  Network interception                Observing, modifying, or mocking
                                      network traffic

  Page Object Model (POM)             A design pattern that keeps page
                                      locators and actions in page
                                      classes
  -----------------------------------------------------------------------

### Hooks example

``` javascript
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});

test('check heading', async ({ page }) => {
  await expect(page.getByRole('heading')).toBeVisible();
});
```

Common hooks:

-   `test.beforeAll()` -- Runs once before all tests in the relevant
    scope.
-   `test.beforeEach()` -- Runs before each test.
-   `test.afterEach()` -- Runs after each test.
-   `test.afterAll()` -- Runs once after all tests in the relevant
    scope.

### Grouping tests

``` javascript
test.describe('Login tests', () => {
  test('valid login', async ({ page }) => {
    // Test steps
  });

  test('invalid login', async ({ page }) => {
    // Test steps
  });
});
```

------------------------------------------------------------------------

## 9. Basic Playwright configuration

The `playwright.config.js` file controls how tests run.

``` javascript
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: 'html',

  use: {
    baseURL: 'https://example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
```

With this configuration, tests are set up to run against three browser
projects. Adjust `workers`, `retries`, and other settings to suit your
project and CI environment.

------------------------------------------------------------------------

## 10. Basic interview questions and answers

### 1. What is Playwright?

Playwright is an open-source browser automation tool used to test web
applications across Chromium, Firefox, and WebKit.

### 2. What are the main benefits of Playwright?

Cross-browser support, auto-waiting, parallel execution, browser
contexts, network interception, screenshots, videos, and Trace Viewer.

### 3. Which programming languages does Playwright support?

JavaScript, TypeScript, Python, Java, and .NET.

### 4. What is Playwright Test?

It is Playwright's test runner. It provides test definitions,
assertions, fixtures, hooks, parallel execution, retries, and reporting.

### 5. What is the difference between `browser`, `context`, and `page`?

A browser is the browser instance, a context is an isolated session, and
a page is a tab within that context.

### 6. What is a locator?

A locator is used to find and interact with an element on a web page.
Examples include `getByRole()`, `getByText()`, and `locator()`.

### 7. What is auto-waiting?

Playwright automatically checks that an element is ready for an
action---for example, visible, stable, enabled, and able to receive
events---before performing that action.

### 8. What is the difference between `locator()` and `getByRole()`?

`locator()` can use CSS or XPath selectors and other selector forms.
`getByRole()` finds elements by their accessible role and usually their
accessible name, making tests closer to how users understand the page.

### 9. What is the difference between `fill()` and `type()`?

`fill()` sets the input value directly and is usually preferred for
entering text. `pressSequentially()` types characters one by one when
keyboard-like input is needed. Older examples may use `type()`.

### 10. How do you handle multiple elements with the same locator?

Use `count()`, `first()`, `last()`, or `nth(index)`. Remember that
`nth()` uses zero-based indexing.

### 11. What is a browser context?

A browser context is an isolated session with its own cookies and
storage. It helps test different users without sharing session data.

### 12. How do you handle a new tab?

Wait for the `popup` event while performing the action that opens the
new tab, then use the returned page object.

### 13. How do you handle an iframe?

Use `frameLocator()` to locate elements inside an iframe.

### 14. What is the Page Object Model?

POM is a design pattern in which page-specific locators and actions are
kept in separate classes or modules. It improves reuse and
maintainability.

### 15. What are fixtures in Playwright?

Fixtures provide test resources and setup, such as `page`, `context`,
and `browser`. They help manage test setup and cleanup.

### 16. What are hooks?

Hooks are methods that run before or after tests or test groups, such as
`beforeEach()` and `afterEach()`.

### 17. How do you debug a failed Playwright test?

Use `--debug`, UI Mode, Playwright Inspector, Trace Viewer, screenshots,
videos, and useful logs.

### 18. What is Trace Viewer?

Trace Viewer is a debugging tool that lets you inspect test steps, DOM
snapshots, screenshots, and network activity from a recorded trace.

### 19. What is network interception?

It is the ability to observe, modify, block, or mock network requests
and responses using methods such as `page.route()`.

### 20. How do you run tests in parallel?

Playwright Test supports parallel execution through workers. You can
configure `workers` in the config file or use `--workers=2` on the
command line.

### 21. What is the difference between `toBeVisible()` and `toBeHidden()`?

`toBeVisible()` checks that an element is visible. `toBeHidden()` checks
that it is hidden or not present.

### 22. How do you run a test in headed mode?

Use:

``` bash
npx playwright test --headed
```

### 23. How do you run only one test file?

Use:

``` bash
npx playwright test tests/login.spec.js
```

### 24. What is Codegen?

Codegen opens a browser and records user actions to generate suggested
Playwright code. It is useful for learning and creating a first draft of
locators and steps.

### 25. How is Playwright different from Selenium?

Playwright has built-in auto-waiting, browser contexts, tracing, and
network interception. Selenium supports a wide range of browsers and
languages and has a mature ecosystem. The best choice depends on project
needs.

------------------------------------------------------------------------

## 11. Suggested project folder structure

``` text
playwright-learning/
│
├── tests/
│   ├── login.spec.js
│   └── dashboard.spec.js
│
├── pages/
│   └── LoginPage.js
│
├── test-data/
│   └── users.json
│
├── playwright-report/
├── test-results/
│
├── playwright.config.js
├── package.json
└── README.md
```

The `playwright-report` and `test-results` folders are commonly
generated during test runs. You do not need to create them manually.

## 12. Best practices

-   Prefer `getByRole()`, `getByLabel()`, and other user-facing locators
    when suitable.
-   Use stable test IDs when accessible locators are not practical.
-   Avoid fragile XPath or long CSS selectors when a better locator is
    available.
-   Avoid fixed waits such as `waitForTimeout()` unless there is a clear
    reason.
-   Keep tests independent so they can run in any order.
-   Use meaningful test names and assertions.
-   Store passwords and tokens in environment variables or a secure
    secrets manager; never commit them to GitHub.
-   Use Page Object Model when it makes a test suite easier to maintain.
-   Capture traces, screenshots, or videos when useful for diagnosing
    failures.
-   Run tests in CI/CD to catch issues early.
-   Do not depend on test execution order.

## 13. Useful official resources

-   [Playwright official
    documentation](https://playwright.dev/docs/intro)
-   [Installation](https://playwright.dev/docs/intro)
-   [Locators](https://playwright.dev/docs/locators)
-   [Assertions](https://playwright.dev/docs/test-assertions)
-   [Test configuration](https://playwright.dev/docs/test-configuration)
-   [Debugging](https://playwright.dev/docs/debug)
-   [Trace Viewer](https://playwright.dev/docs/trace-viewer)
-   [API testing](https://playwright.dev/docs/api-testing)

------------------------------------------------------------------------

## Final note

Start by learning locators, actions, assertions, and test execution.
Then practise handling dropdowns, alerts, frames, multiple tabs, and
dynamic elements. After that, move on to fixtures, hooks, Page Object
Model, API testing, network interception, and CI/CD.

**Practice is the key:** write small tests, run them, inspect failures,
and improve your locators and assertions.
