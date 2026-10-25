import { framesPage } from '../support/pages/framesPage';

type FrameGetter = () => Cypress.Chainable<JQuery<HTMLElement>>;

const clickAllButtonsAndVerify = (frame: FrameGetter) => {
  framesPage.buttons(frame).each(($el) => {
    const buttonText = $el.text().trim();
    cy.wrap($el).click();
    frame().should('contain', `Button pressed: ${buttonText}`);
  });
};

describe('Scenario 6 - Frames', () => {
  beforeEach(() => {
    framesPage.visit();
  });

  it('Clicks every button in the Outer Frame', () => {
    clickAllButtonsAndVerify(() => framesPage.outerFrame());
  });

  it('Clicks every button in the Inner Frame', () => {
    clickAllButtonsAndVerify(() => framesPage.innerFrame());
  });
});