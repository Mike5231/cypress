// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addElementToCart', function (productName) {
    cy.get('div[class="product-thumb"]')
        .each(($el, index, $list) => {

            cy.get(':has(.description) h4 a').eq(index).then(function ($el1) {
                let producto = $el1.text()
                cy.log(producto)

                if (producto.includes(productName)) {
                    cy.log('Se ha encontrado el elemento buscado')
                    cy.get('div[class="product-thumb"]').eq(index).find('button[aria-label^="Add to Cart"]').click()
                    cy.get('div[class="alert alert-success alert-dismissible"]').should('contains.text', productName)
                }
            })

        })
})
