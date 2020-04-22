describe("Check cart", () => {
  it("should be empty when your open cart at the first time", () => {
    cy.visit("/cart");
    expect([]).to.be.empty;
    expect(localStorage.getItem("products-collection")).to.be.null;
  });
});

describe("Check cart localStorage", () => {
  it("should be displayed added products in the cart localStorage", () => {
    cy.visit("products/5e8da23ed9a7af033c9b1cca");

    cy.get(".button.btn").should("have.class", "disabled");

    cy.get(".size > :nth-child(1) > span").click();
    cy.get(".button.btn").dblclick().should(() => {
      expect(localStorage.getItem("products-collection")).not.be.null;
      expect(localStorage.getItem("cart-numbers")).to.eq("2");
    });
  });
});

describe("Check wishlist localStorage", () => {
  it("should be displayed added products in the wishlist localStorage", () => {
    cy.visit("products/5e8da23ed9a7af033c9b1cca");
    cy.get('.buttons > .svg-inline--fa > path').click().should(() =>
      expect(localStorage.getItem("wishlist-collection")).not.be.null
    )
  });
});

