import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';
import { cartPage } from '../support/pages/cartPage';
import { checkoutPage } from '../support/pages/checkoutPage';

const testValues = {
    username: 'standard_user',
    password: 'secret_sauce',
    topSize: 3,
    firstName: 'whatever',
    lastName: 'whatever',
    postalCode: 'whatever',
    completeMessage: 'Thank you for your order!'
}

describe('Scenario 1 - Buy the most expensive products', function ()
{
    it('Adds the top products to the cart and completes the checkout', function(){
        loginPage.visit()
        loginPage.login(testValues.username, testValues.password)

        inventoryPage.getProducts(true).then((products) => {
            const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, testValues.topSize);
            cy.log(JSON.stringify(topProducts));

            let expectedTotal = 0;
            topProducts.forEach(product => {
                inventoryPage.addToCart(product.name)
                expectedTotal += product.price
            });

            inventoryPage.goToCart()

            cartPage.items().should('have.length', testValues.topSize)
            cartPage.getProducts().then((cartProducts) => {
                expect(cartProducts).to.have.deep.members(topProducts);
            })

            cartPage.checkout()
            checkoutPage.fillInformation(testValues.firstName, testValues.lastName, testValues.postalCode)

            checkoutPage.getSubtotal().should('be.closeTo', expectedTotal, 0.01)

            checkoutPage.finish()
            checkoutPage.completeHeader().should('have.text', testValues.completeMessage)

            checkoutPage.backToProducts()
        })
    })
})