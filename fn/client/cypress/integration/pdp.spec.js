const wishListArrey = '[{"id":"5e8da1fcd9a7af033c9b1bce","title":"dresses zori abipuniv fal po.","images":["dresses_women.jpg"],"description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.","propetries":[{"size":["S"],"_id":"5e8da1fcd9a7af033c9b1bcf","available":6,"sku":"TXWOEP11"},{"size":["L"],"_id":"5e8da1fcd9a7af033c9b1bd0","available":6,"sku":"PMO7DVZS"},{"size":["XL"],"_id":"5e8da1fcd9a7af033c9b1bd1","available":2,"sku":"S5J85D03"}],"price":144,"mrsp":207,"rate":3.86,"brand":"zori","catalog":"women","category":"dresses","color":"blue"}]'
const productsCollection = '[{"id":"5e8da1fcd9a7af033c9b1bce","title":"dresses zori abipuniv fal po.","images":["dresses_women.jpg"],"description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.","propetries":{"size":["S"],"_id":"5e8da1fcd9a7af033c9b1bcf","available":6,"sku":"TXWOEP11"},"price":144,"mrsp":207,"rate":3.86,"brand":"zori","catalog":"women","category":"dresses","color":"blue","quantity":1}]'

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
            expect(localStorage.getItem('wishlist-collection')).to.eq(wishListArrey)
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

