describe('check buttons posts per page', ()=>{
    it ('check 15 button', ()=>{
        cy.visit('/productlist/kids')
        cy.get('.wrapper').
        should('have.length',15);
    })

    it ('check 30 button', ()=>{
        cy.visit('/productlist/kids')
        cy.get('.btn-group > :nth-child(2)').click()
        cy.get('.wrapper').
        should('have.length',30);
    })

    it('check if sessionStorage() contain value 30', () => {
        cy.get('.btn-group > :nth-child(2)').click().should(() => {
          expect(sessionStorage.getItem('postPerPage')).to.eq('30')
        })
    })

    it ('check 60 button', ()=>{
        cy.visit('/productlist/kids')
        cy.get('.btn-group > :nth-child(3)').click()
        cy.get('.wrapper').
        should('have.length', 60);
    })

    it('check if sessionStorage() contain value 60', () => {
        cy.get('.btn-group > :nth-child(3)').click().should(() => {
          expect(sessionStorage.getItem('postPerPage')).to.eq('60')
        })
    })

    it('check if sessionStorage() contain value 15', () => {
        cy.get('.btn-group > :nth-child(1)').click().should(() => {
          expect(sessionStorage.getItem('postPerPage')).to.eq('15')
        })
    })


})