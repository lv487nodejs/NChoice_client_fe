import {getFromLocalStorage} from "../../../src/services/localStoreService";

describe("Check cart", () => {
  it("should be empty when your open cart at the first time", () => {
    cy.visit("/cart");
    expect([]).to.be.empty;
    expect(localStorage.getItem("products-collection")).to.be.null;
  });
});

describe("Check cart localStorage", () => {
  it("should be displayed added products in the cart localStorage", () => {
    cy.visit("products/5ea9a730d34cc7194801d5a0");

    cy.get(".button.btn").should("have.class", "disabled");

    cy.get("#S").click();
    cy.get(".button.btn").click().should(() => {
      expect(getFromLocalStorage('products_collection')).not.be.null;
      expect(getFromLocalStorage('cart_numbers')).to.eq(1);
    });
  });
});

describe("Check wishlist localStorage", () => {
  it("should be displayed added products in the wishlist localStorage", () => {
    cy.visit("products/5ea9a730d34cc7194801d5a0");
    cy.get('.buttons > .svg-inline--fa > path').click().should(() =>
      expect(getFromLocalStorage('wishlist_collection')).not.be.null
    )
  });
});

