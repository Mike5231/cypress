/// <reference types="cypress" />

describe('Segundo conjunto de pruebas', function () {
    before(function () {
        cy.fixture('example.json').then(function (datos) {
            this.datos = datos
            cy.fixture(this.datos.imagen).as('imagen')
            cy.viewport('iphone-x')
        })
    })

    beforeEach(function () {
        cy.visit('https://demoqa.com/automation-practice-form')

    })

    it('Llenamos nuestro formulario', function () {

        cy.get('#firstName').type(this.datos.name)
        cy.get('#lastName').type(this.datos.lastname)
        cy.get('#userEmail').type(this.datos.email)
        cy.get('input[name="gender"][value="' + this.datos.sex + '"]').check({
            force: true
        }).should('be.checked')
        cy.get('#userNumber').type(this.datos.phone)
        cy.get('#dateOfBirthInput').click({
            force: true
        })
        cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.birthday[0])
        cy.get('.react-datepicker__year-select').should('be.visible').select(this.datos.birthday[1])
        cy.get('.react-datepicker__day--0' + this.datos.birthday[2])
            .should('be.visible').click()
        cy.get('#dateOfBirthInput')
            .should('contain.value', this.datos.birthday[0].substring(0, 3))
            .should('contain.value', this.datos.birthday[1])
            .should('contain.value', this.datos.birthday[2])
        cy.get('.subjects-auto-complete__value-container').type(this.datos.subjects)
        cy.get('div[id^="react-select-"]').click()
        cy.get('.subjects-auto-complete__value-container')
            .should('contains.text', this.datos.subjects)
        cy.get('div[class="custom-control custom-checkbox custom-control-inline"]:has(label:contains("' + this.datos.hobbies[0] + '")) input').check({
            force: true
        }).should('be.checked')
        cy.get('div[class="custom-control custom-checkbox custom-control-inline"]:has(label:contains("' + this.datos.hobbies[1] + '")) input').check({
            force: true
        }).should('be.checked')
        cy.get('#uploadPicture').then(function ($el) {
            const blob = Cypress.Blob.base64StringToBlob(this.imagen, 'image/jpg')
            const file = new File([blob], this.datos.imagen, {
                type: "image/jpg"
            })
            const list = new DataTransfer()
            list.items.add(file)
            const myFileList = list.files
            $el[0].files = myFileList
            $el[0].dispatchEvent(new Event('change', {
                bubbles: true
            }))
        })
        cy.get('#currentAddress').type(this.datos.address)
        cy.get('#state').click().find('div:contains("' + this.datos.state + '")[id^="react-select"]')
            .should('be.visible').click()
        cy.get('#city').click().find('div:contains("' + this.datos.city + '")[id^="react-select"]')
            .should('be.visible').click()
        cy.get('#submit').click({
            force: true
        })
        cy.get('#example-modal-sizes-title-lg')
            .should('have.text', 'Thanks for submitting the form')
        cy.get('td:contains(Student Name) +td')
            .should('have.text', this.datos.name + ' ' + this.datos.lastname)
        cy.get('td:contains(Student Email) +td')
            .should('have.text', this.datos.email)
        cy.get('td:contains(Gender) +td')
            .should('have.text', this.datos.sex)
        cy.get('td:contains(Mobile) +td')
            .should('have.text', this.datos.phone)
        cy.get('td:contains(Date of Birth) +td')
            .should('have.text', this.datos.birthday[2] + ' ' + this.datos.birthday[0] + ',' + this.datos.birthday[1])
        cy.get('td:contains(Hobbies) +td')
            .should('have.text', this.datos.hobbies[0] + ', ' + this.datos.hobbies[1])
        cy.get('td:contains(Picture) +td')
            .should('have.text', this.datos.imagen)
        cy.get('td:contains(Address) +td')
            .should('have.text', this.datos.address)
        cy.get('td:contains(State and City) +td')
            .should('have.text', this.datos.state + ' ' + this.datos.city)
    })
})