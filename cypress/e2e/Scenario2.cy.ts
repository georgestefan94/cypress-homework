import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';

const testValues = {
    username: 'standard_user',
    password: 'secret_sauce'
}

describe('Scenario 2 - Sort products by price', function ()
{
    beforeEach(function(){
        loginPage.visit()
        loginPage.login(testValues.username, testValues.password)
    })

    it('Sorts products by price, low to high, also checks', function(){
        inventoryPage.sortBy('lohi')

        inventoryPage.getProducts().then((products) => {
            const prices = products.map(product => product.price);
            cy.log(prices.join(', '));

            const expectedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(expectedPrices);
        })
    })

    it('Sorts products by price, high to low, also checks', function(){
        inventoryPage.sortBy('hilo')

        inventoryPage.getProducts().then((products) => {
            const prices = products.map(product => product.price);
            cy.log(prices.join(', '));

            const expectedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(expectedPrices);
        })
    })
})