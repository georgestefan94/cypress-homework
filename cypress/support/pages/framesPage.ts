//type FrameGetter = () => Cypress.Chainable<JQuery<HTMLElement>>;
export type FrameGetter = () => Cypress.Chainable<JQuery<any>>;
class FramesPage {
  private url = 'https://uitestingplayground.com/frames';

  private selectors = {
    frame: 'iframe',
    button: 'button',
  };

  visit() {
    cy.visit(this.url);
    cy.frameLoaded(this.selectors.frame);
  }

  outerFrame(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.selectors.frame)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then((body: HTMLElement) => cy.wrap(body));
  }

  innerFrame(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.outerFrame()
      .find(this.selectors.frame)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then((body: HTMLElement) => cy.wrap(body));
  }

  buttons(frame: FrameGetter) {
    return frame().find(this.selectors.button);
  }
}

export const framesPage = new FramesPage();