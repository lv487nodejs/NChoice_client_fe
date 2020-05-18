// import ProductInfo from "../../fixtures/productList/"
const id = '5e8da1fcd9a7af033c9b1bce'
const pcatalogLink = '/productlist/women'
const imgAlt = 'dresses_women.jpg'
const linkHref = '/products/'+id 
const rate = '3.86'
const productName='dresses zori abipuniv fal po.'
const price = 144
const msrp = 207
const currency ='1' //if euro, if PLN = 4.5185, if $ = 1.086
const currencyIcon = '€' //if euro, if PLN = zł, if $ = $
const real_price = `${price*currency} ${currencyIcon}`
const msrp_price = `${msrp*currency} ${currencyIcon}`

describe('Visit product list page', () => {
    it('Visit product list page', () => {
        cy.viewport(1280, 720);
        cy.visit(pcatalogLink);
        cy.get('#wrapper').should('exist');
        cy.get('#productCard').should('exist');
        cy.get('#productImg').should('exist');
        cy.get('#productLink').should('exist');
        cy.get('.info').should('exist');
        cy.get('#starRating').should('exist');
    });
    it('Check link', () => {
        cy.viewport(1280, 720);
        cy.get('a#productLink').should('have.attr', 'href', linkHref )
    });
    it('Check product image, rate, name', () => {
        cy.viewport(1280, 720);
        cy.get('#productImg').should('have.attr', 'alt', imgAlt);
        cy.get('#productImg').should('have.attr', 'src', '/images/products/' + imgAlt);
        cy.get('.info').should('have.attr', 'id', id);
        cy.get('#starRating').should('have.attr', 'rating', rate);
        cy.get('#productName').should('have.text', productName);
    });
    it('Check product price', () => {
        cy.viewport(1280, 720);
        cy.get('#realPrice').should('have.length', 1);
        cy.get('#realPrice').should('have.text', real_price);
        cy.get('#msrpPrice').should('have.length',1);
        cy.get('#msrpPrice').should('have.text', msrp_price);
    });
})