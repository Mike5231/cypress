/// <reference types="Cypress"/>    

describe('Pruebas XHR', () => {
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach('', () => {
        cy.visit('https://example.cypress.io/commands/network-requests')
    })

    it('Prueba GET', () => {
        cy.intercept('GET', '**/comments/*').as('getComment')
        cy.get('.network-btn:contains("Get Comment")').click()
        cy.wait('@getComment').its('response.statusCode').should('eq', 200)
    })

    it('Prueba POST', () => {
        cy.intercept('POST', '**/comments').as('postComment')
        cy.get('.network-post:contains("Post Comment")').click()
        cy.wait('@postComment').should(({
            request,
            response
        }) => {
            expect(request.body).to.include('email')
            expect(request.headers).to.have.property('content-type')
            expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
        })
    })

    it('Prueba PUT MOCK', () => {
        let mensaje = 'whoa, this comment does not exist'
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*'
        }, {
            statusCode: 404,
            body: {
                error: mensaje
            },
            headers: {
                'access-control-allow-origin': '*'
            },
            delayMs: 500,
        }).as('putComment')
        cy.get('.network-put').click()
        cy.wait('@putComment')
        cy.get('.network-put-comment').should('contain', mensaje)
    })
})