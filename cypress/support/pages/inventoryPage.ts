import { Product } from '../types';
import { parsePrice } from '../utils';

class InventoryPage {
  private selectors = {
    item: '.inventory_list .inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    cartLink: '.shopping_cart_link',
    sortDropdown: '.product_sort_container'
  };

  private toButtonId(name: string) {
    return 'add-to-cart-' + name.trim().toLowerCase().replace(/\s+/g, '-');
  }

  getProducts(log = false): Cypress.Chainable<Product[]> {
    const products: Product[] = [];

    return cy.get(this.selectors.item).each(($el, index) => {
      products.push({
        name: $el.find(this.selectors.itemName).text().trim(),
        price: parsePrice($el.find(this.selectors.itemPrice).text()),
      });

      if (log == true)
      {
        cy.log(products[index].name)
        cy.log(products[index].price.toString())
      }

    }).then(() => products);
  }

  addToCart(productName: string) {
    cy.get(`[id="${this.toButtonId(productName)}"]`).click();
  }

  goToCart() {
    cy.get(this.selectors.cartLink).click();
  }

  // Scenario 2 specific
  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    cy.get(this.selectors.sortDropdown).select(option);
  }
}

export const inventoryPage = new InventoryPage();