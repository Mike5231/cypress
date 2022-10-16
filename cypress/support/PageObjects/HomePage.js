export default class HomePage
{
    getSearchBoxInput()
    {
        return cy.get('#search_query_top')
    }
 
    getSearchBoxButton()
    {
        return cy.get('#searchbox > .btn')
    }
 
    getAddToCardElementButton(productDescription)
    {
        cy.get('div[class="button-container"]').invoke('attr', 'style', 'display: block')
        return cy.get('.product-container:has(.product-name[title="'+productDescription+'"]) .ajax_add_to_cart_button')
    }
 
    getProceedToCheckoutButton()
    {
        return cy.get('.button-medium[title="Proceed to checkout"]')
    }
 
    
}