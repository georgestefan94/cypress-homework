import { Product } from '../types';
import { parsePrice } from '../utils';

class CartPage {
  private selectors = {
    item: '.cart_list .cart_item',
    itemName: '[data-test="inventory-item-name"]',
    itemPrice: '[data-test="inventory-item-price"]',
    checkoutButton: '#checkout',
  };

  items() {
    return cy.get(this.selectors.item);
  }

  getProducts(): Cypress.Chainable<Product[]> {
    const products: Product[] = [];

    return this.items().each(($el) => {
      products.push({
        name: $el.find(this.selectors.itemName).text().trim(),
        price: parsePrice($el.find(this.selectors.itemPrice).text()),
      });
    }).then(() => products);
  }

  checkout() {
    cy.get(this.selectors.checkoutButton).click();
  }
}

export const cartPage = new CartPage();