describe("carousel", () => {
  it("Check carousel images", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);

    cy.get(".categories-nav").should("be.visible");
    cy.get(".active > .carousel-caption > h2").should("be.visible");
    cy.get(".active > a > .d-block").should("be.visible");

    cy.get(".img-carousel").each($el => {
      cy.wrap($el).should("exist");
    });
    cy.get(".img-carousel").each($el => {
      cy.wrap($el).should("have.attr", "alt");
    });
    cy.get(".carousel-caption").each($el => {
      cy.wrap($el).should("exist");
    });

    cy.get('.carousel-indicators').children().should('have.length', 10);
    cy.get('.categories-nav').children().should('have.length', 7);

    cy.get('.category-item').each($el => {
      cy.wrap($el).children(7).should('have.length', 1);
    });


  });

  it("should display all categories only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(1) > a").click();
  });

  it("should display hoodies only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(2) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 'hoodies');
  });

  it("should display jeans only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(3) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 'jeans');
  });

  it("should display t-shirts only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(4) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 't-shirts');
  });

  it("should display shoes only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(5) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 'shoes');
  });

  it("should display shirts only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(6) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 'shirts');
  });

  it("should display sweaters only", () => {
    cy.visit("/catalogs/men").viewport(1280, 720);
    cy.get(".categories-nav > :nth-child(7) > a").click();
    cy.get('.products-items > .wrapper > .productCard').should('contain', 'sweaters');
  });

});





