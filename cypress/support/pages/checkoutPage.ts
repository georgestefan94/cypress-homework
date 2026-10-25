import { parsePrice } from '../utils';

class CheckoutPage {
  private selectors = {
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
    continueButton: '#continue',
    subtotal: '.summary_subtotal_label',
    finishButton: '#finish',
    completeHeader: '.complete-header',
    backButton: '#back-to-products',
  };

  fillInformation(firstName: string, lastName: string, postalCode: string) {
    cy.get(this.selectors.firstName).type(firstName);
    cy.get(this.selectors.lastName).type(lastName);
    cy.get(this.selectors.postalCode).type(postalCode);
    cy.get(this.selectors.continueButton).click();
  }

  getSubtotal(): Cypress.Chainable<number> {
    return cy.get(this.selectors.subtotal).invoke('text').then((text) => parsePrice(text));
  }

  finish() {
    cy.get(this.selectors.finishButton).click();
  }

  completeHeader() {
    return cy.get(this.selectors.completeHeader);
  }

  backToProducts() {
    cy.get(this.selectors.backButton).click();
  }
}

export const checkoutPage = new CheckoutPage();