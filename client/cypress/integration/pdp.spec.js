import { wishListArray, productsCollection } from '../fixtures/productList/products'

describe('Visit product detail page', () => {
    it('Visit product detail page', () => {
        cy.visit('/productlist/women');
        cy.get('#5e8da1fcd9a7af033c9b1bce').click();
    });
})
describe('Check information about product', () => {
    it('General check', () => {
        cy.get('#wrapper').should('exist');
    });
    it('Check images', () => {
        cy.get('#images').should('exist');
        cy.get('img').each($el => {
            cy.wrap($el).should('have.attr', 'alt')
        });
    });
    it('Check description', () => {
        cy.get('.text').should('exist');
        cy.get('#title').should('exist');
        cy.get('#description').should('exist');
    });

    it('Check rate', () => {
        cy.get('#starRating').should('exist');
        cy.get('#starRating').should('have.attr', 'rating', '3.86');
        cy.get('#stars').children().should('have.length', 5);
    });
    it('Check properties: color and size', () => {
        cy.get('#color').should('exist');
        cy.get('#color').should('have.attr', 'style', 'background-color: blue;');
        cy.get('#size').should('exist');
        cy.get('#size').children().should('have.length', 3);
        cy.get('#size .sizeItem').each($el => {
            cy.wrap($el).children(3).should('have.length', 1);
        });
        cy.get('#size .sizeItem').children('#S').should('have.attr', 'id', 'S');
        cy.get('#size .sizeItem').children('#L').should('have.attr', 'id', 'L');
        cy.get('#size .sizeItem').children('#XL').should('have.attr', 'id', 'XL');
    });

    it('Check buttons', () => {
        cy.get('#heartButton').should('exist');
        cy.get('#heartButton').click().should(() => {
            expect(localStorage.getItem('wishlist-collection')).to.eq(wishListArray)
        })
        cy.get('#addToCartButton').should('exist');
        cy.get('#addToCartButton').should('have.attr', 'class', 'button disabled btn btn-dark');

        cy.get('#buyNow').should('have.attr', 'class', 'disp-none');
        cy.get('#buyNow').should('be.not.visible');

        cy.get('#S').click();
        cy.get('#addToCartButton').should('have.attr', 'class', 'button btn btn-dark');
        cy.get('#addToCartButton').click().should(() => {
            expect(localStorage.getItem('products-collection')).to.eq(productsCollection)
            expect(localStorage.getItem('cart-numbers')).to.eq('1')
        })
        cy.get('#buyNow').should('have.attr', 'class', 'disp-block');
        cy.get('#buyNow').should('be.visible');
        cy.visit('/checkout');
    });
})

describe('Check simmular products block', () => {
    it('Check simmular products', () => {
        cy.visit('/products/5e8da1fcd9a7af033c9b1bce');
        cy.get('#5e8da1fed9a7af033c9b1bd6').click();
        cy.request('/products/5e8da1fcd9a7af033c9b1bce')

    });
})

