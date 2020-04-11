describe('Testing creation of new category', () => {
    it('Table with products should exist', () => {
        cy.visitCategories('fixture:categoriesList/categories');
        cy.get('#categoriesTable').should('exist');
    });

    it('Table with products should exist', () => {
        cy.visitCategories('fixture:categoriesList/categories');
        cy.get('#categoriesTable').should('exist');
    });
})