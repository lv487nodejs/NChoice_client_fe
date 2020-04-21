describe('pagination',()=>{
    it('active button should have class "active"',()=>{
        cy.visit('/productlist/men')
        cy.viewport(1280,720)
        cy.get('.pagination > :nth-child(1)').should('have.class','active')
        cy.get('.pagination > :nth-child(2)').should('not.have.class','active')
        cy.get('.pagination > :nth-child(2)').click()
        cy.get('.pagination > :nth-child(2)').should('have.class','active')
        cy.get('.pagination > :nth-child(1)').should('not.have.class','active')
    })
    
})