//Importamos Clases de Page Objects
import AddressPage from '../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../support/PageObjects/AutheticationPage'
import HomePage from '../../support/PageObjects/HomePage'
import PaymentPage from '../../support/PageObjects/PaymentPage'
import ShippingPage from '../../support/PageObjects/ShippingPage'
import ShoppingSummaryCartPage from '../../support/PageObjects/ShoppingCartSummary'


//Suite de casos que contiene cada caso 
describe('Primer conjunto de casos de prueba', function () {
    const addressPage = new AddressPage()
    const authenticationPage = new AuthenticationPage()
    const homePage = new HomePage()
    const paymentPage = new PaymentPage()
    const shippingPage = new ShippingPage()
    const shoppingSummaryCartPage = new ShoppingSummaryCartPage()

    beforeEach(() => {
        // ingresamos a la pagina    
        cy.visit(Cypress.env('automation_url') + '/index.php')
    })

    it('Crear una compra desde cero', function () {
        homePage.getSearchBoxInput().type('Blouse')
        homePage.getSearchBoxButton().click()
        homePage.getAddToCardElementButton("Blouse").click({force:true})
        homePage.getProceedToCheckoutButton().click()

        shoppingSummaryCartPage.getProductNameText().should('contain.text', 'Blouse')
        shoppingSummaryCartPage.getProductPriceText().should('contain.text', '27.00')
        shoppingSummaryCartPage.getProceedToCheckoutButton().click()

        authenticationPage.getEmailAddressInput().type('cypress@ateneaconocimientos.net')
        authenticationPage.getPasswordInput().type('Atenea')
        authenticationPage.getSignInButton().click()

        addressPage.getProceedToCheckoutButton().click()

        shippingPage.getTermsOfServiceCheckbox().check().should('be.checked')
        shippingPage.getProceedToCheckoutButton().click()

        paymentPage.getPayByBankWireOptionButton().click()
        paymentPage.getIConfirmMyOrderButton().click()
        paymentPage.getDescriptionTitleText().should('contain.text', 'Your order on My Store is complete.')
    })
})