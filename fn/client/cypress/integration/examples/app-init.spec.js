describe('App initialization', () => {
  it('Loads products on page load', () => {
    cy.visit('/');
    cy.get('.catalogs').children().should('have.length', 3);
    cy.get('.catalogs').each(($el)=> {
      cy.wrap($el).children().should('have.attr', 'href');
    });
  });

  it('Should have a header', () => {
    cy.get('header').should('be.visible')
  });

  it("should have logo", () => {
    cy.get('.logo').should('be.visible')
  });

  it('Should have a footer', () => {
    cy.get('.footer').should('be.visible')
  });

  it('Should have 0 in cart initially', () => {
    cy.get('sup').should('text', '0');
  });

});




