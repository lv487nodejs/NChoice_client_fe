describe('Testing categories list page', () => {
    it('Table with products should exist', () => {
        cy.visitCategories('fixture:categoriesList/categories');
        cy.get('#categoriesTable').should('exist');
    });
})