/// <reference types="Cypress"/>


describe('Tercer feature ', function () {
    before(function () {
        cy.fixture('phones.json').then(function (data) {
            this.data = data
            cy.viewport('macbook-16')
        })
    })

    beforeEach(() => {
        cy.visit("https://demo.opencart.com/index.php")
    })

    it('Realizar compra basadas en su titulo', function () {
        cy.get('#menu ul a:contains("Phones & PDAs")').click()
        this.data.phones.forEach(function (phones) {
            cy.addElementToCart(phones)
        })
    })
})