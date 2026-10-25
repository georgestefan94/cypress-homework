## Requirements

- [Node.js](https://nodejs.org) 20 or newer (LTS recommended). npm is included.
- Nothing else: Cypress and all dependencies are installed by npm.

## Get the code

Clone the repository, or use **Code → Download ZIP** on this page and unzip it.
https://github.com/georgestefan94/cypress-homework

## Install and run 
(using powershell)

```
npm ci
npm test
```

## Watch the tests in the Cypress UI

```
npm run cy:open
```

Choose a browser (Electron works without anything else installed), click **Start E2E Testing**, then click a spec to run it.


## Short Presentation of the project and its structure

My project contains 7 individual tests (e.g. Scenario1.cy.ts) which solve the required exercises

In the "support/pages" folder you'll find files that contain objects needed to navigate the pages or even create an API request (scenario 7 specifically)

I've added all these to comply with the POM and DRY ideas so these will minimize the rewritting of the same code

However, those pages and their functions will never assert anything, I've left that only for the actual test files

In general, each test will have a few test values based on each scenario and will call the functions from the proper page objects defined in the "pages" folder. These will handle the page visits, selectors, clicking, typing, identifying iframes and so on. The tests themselves will verify if the results match the expected ones.

Let me give an easy example to better understand what I mean. Let's take Scenario 3 which is easy. Here we have to perform different types of scrolls to eventually reveal some buttons that need to be clicked.

For this one I've added the scrollPage class and created + exported a scrollPage object to be used in my test. This scrollPage is able to visit the required website and then start identifying the scrollable containers, scroll and target buttons. 

For example I have
container2() { return cy.get(this.selectors.container2); }
which is a function that returns the identified container element that I need to scroll
In my actual test I use scrollPage.container2().should('be.visible') to assert if that element is visible to be sure that I can interact properly with it. I could've added this check inside the scrollPage, but as I've said, I wanted to keep all the checks in my actual tests so this is my solution for that.

Anyway, if the assert passes then I call:
scrollPage.scrollContainer2(ScrollTestValues.target2Position)
which will scroll the element towards the target2Position destination that is part of my testValues. Seems a bit overkill maybe since clearly the test won't change, but I wanted to do it as a proof of concept. ScrollPage handles this action as well and then:

scrollPage.target2().should('be.visible')
scrollPage.target2().click()

I just call scrollpage again to get the revealed button and check if it's visible, then I click on it. I don't necesarrily think I should have a scroll.Page.target2Click() function instead of scrollPage.target2().click(), but I'm not sure.

At any rate, this is the idea, most actions are performed via scrollPage here, the test file itself contains very little actual hardcoded info, apart from the test values themselves, but the selectors are contained within the "page" files, so if these would have to be changed, then it would be easy to just update them there, not in every possible call or somethign stupid like that.

In some cases I've had some constant variables instead of a list of test values:
const fileLocation = 'cypress/fixtures/'
const dragDropFile = 'to_send1.txt';
const browseFile = 'to_send2.txt';
const expectedMessage = ' file(s) selected'

but in a real scenario, I'd probably opt for something different

Anyway, I hope this is enough explanation, I look forward to talking about these solutions later.

