describe('filter', () => {
    it(' filter items should be visible', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(1) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(2) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(3) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(4) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(5) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(6) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(7) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(8) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(9) > .list-group-item').should('be.visible');
        cy.get(':nth-child(2) > ul > :nth-child(10) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(1) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(2) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(3) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(4) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(5) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(6) > .list-group-item').should('be.visible');
        cy.get(':nth-child(3) > ul > :nth-child(7) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(1) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(2) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(3) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(4) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(5) > .list-group-item').should('be.visible');
        cy.get(':nth-child(4) > ul > :nth-child(6) > .list-group-item').should('be.visible');
    });

    it('brand filter should return Gosha brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(1) > .list-group-item').click();        
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'gosha');

    });
    
    it('brand filter should return Ruma brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(2) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'ruma');
    });
    it('brand filter should return Cassics brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(3) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'cassics');
    });
    it('brand filter should return Medicine brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(4) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'medicine');
    });
    it('brand filter should return Dive brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(5) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'dive');
    });
    it('brand filter should return Tier brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(6) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'tier');
    });
    it('brand filter should return Addic brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(7) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'addic');
    });
    it('brand filter should return Hikee brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(8) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'hikee');
    })
    it('brand filter should return Zori brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(9) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'zori');
    });
    it('brand filter should return Tommy Kesh brand items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(2) > ul > :nth-child(10) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain', 'tommy kesh');
    })

    it('category filter should return category items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(3) > ul > :nth-child(1) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('category').should('contain', 'hoodies');
    });
    it('color filter should return color items only', () => {
        cy.visit('/productlist/kids');
        cy.viewport(1280, 720);
        cy.get(':nth-child(4) > ul > :nth-child(1) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('color').should('contain', 'blue');
    // });
    it('brands should be not visible and  visible', () => {
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.not.visible');
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.visible');
    })
    it('categories should be not visible and  visible', () => {
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.not.visible');
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.visible');
    })
    it('colors should be not visible and  visible', () => {
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.not.visible');
        cy.get('.filter-group > :nth-child(2) > .fa').click();
        cy.get(':nth-child(2) > ul').should('be.visible');
    })

    it('should show Hoodies Gosha items', () => {
        cy.get(':nth-child(2) > ul > :nth-child(1) > .list-group-item').click();
        cy.get(':nth-child(3) > ul > :nth-child(1) > .list-group-item').click();
        cy.window().its('store').invoke('getState').its('filter').its('brand').should('contain','gosha');
        cy.window().its('store').invoke('getState').its('filter').its('category').should('contain', 'hoodies');

    });
});
