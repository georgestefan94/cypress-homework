// <reference types="Cypress" />
import 'cypress-real-events';
import { scrollPage } from '../support/pages/scrollPage';

let ScrollTestValues = {
    target2Position: "bottomRight",
    target3OuterPosition: "bottom",
    target3InnerPosition: "right",
    expectedFinalText: "All buttons clicked!"
};

describe('Scenario 3 - Scrolls', function ()
{
    it('Scroll and Click All', function(){
                scrollPage.visit()

        scrollPage.target1().should('be.visible')
        scrollPage.target1().click()

        scrollPage.container2().should('be.visible')
        scrollPage.scrollContainer2(ScrollTestValues.target2Position)
        scrollPage.target2().should('be.visible')
        scrollPage.target2().click()

        scrollPage.outerScroll3().should('be.visible')
        scrollPage.scrollOuter3(ScrollTestValues.target3OuterPosition)
        scrollPage.innerScroll3().should('be.visible')
        scrollPage.scrollInner3(ScrollTestValues.target3InnerPosition)
        scrollPage.target3().should('be.visible')
        scrollPage.target3().click()

        scrollPage.hoverRow4()
        scrollPage.target4().should('be.visible')
        scrollPage.target4().click()

        scrollPage.progressText().should('have.text', ScrollTestValues.expectedFinalText)
    })
})