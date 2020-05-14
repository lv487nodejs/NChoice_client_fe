
const form = {
    firstName: 'Volodymyr',
    lastName: 'Trach',
    email: 'hello.world@gmail.com',
    country: 'Ukraine',
    city: 'Lviv',
    street: 'Sadova',
    buildingNumber: '2a',
    deliveryType: 'currier',
    contactPhone: '0985468923',
    paymentMethod: 'cash',
}

beforeEach(() => {
    cy.localStorage()
  })

describe('check root for checkout', () => {
    it('add to cart and visit checkout', () => {
        cy.visit('/products/5ea9a730d34cc7194801d5a0')
        cy.get('#buyNow').
            should('not.be.visible')
        cy.get('.size > :nth-child(1) > span').
            wait(50).
            click()
        cy.get('#buyNow').
            should('have.class', 'disp-block').
            and('be.visible').click()
    })

    it('cy.location() - get window.location', () => {
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/checkout')
        })
    })

    it('check all elements (header)', () => {
        cy.get('h2.text-center').
            should('exist').
            and('be.visible')
    })

    it('check all elements (form)', () => {
        cy.get('form').
            should('exist').
            and('be.visible')
    })

    it('check all elements (table)', () => {
        cy.get('table').
            should('exist').
            and('be.visible')
    })

})

describe('add to many items', () => {
    it('check table before adding items', () => {
        cy.get('tbody > :nth-child(1) > :nth-child(3)').
        should('contain', '1')
    })
    it('go to cart and add to many items', () => {
        cy.get('a > .btn').click()
        cy.get('.fa-plus > path').click().click()
        cy.get('[href="/checkout"] > .cart-btns').click()
    })
    it('cy.location() - get window.location', () => {
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/checkout')
        })
    })
    it('check table after adding items', () => {
        cy.get('tbody > :nth-child(1) > :nth-child(3)').
            should('contain', '3')
    })
})



describe('check validation before form', () => {
    it('check error validation', () => {
        cy.get('form > .btn').click()
        cy.get('.invalid-feedback').
            should('be.visible').
            and('have.class', 'invalid-feedback')
    })
})

describe('fill in form', () => {
    it('fill all fields', () => {
        cy.get('#firstNameValidate').type(form.firstName).
            should('have.value', form.firstName)
        cy.get('#lastNameValidate').type(form.lastName).
            should('have.value', form.lastName)
        cy.get('#emailValidate').type(form.email).
            should('have.value', form.email)
        cy.get('#phoneValidate').type(form.contactPhone).
            should('have.value', form.contactPhone)
        cy.get('#countryValidate').select(form.country).
            should('have.value', form.country)
        cy.get('#cityValidate').type(form.city).
            should('have.value', form.city)
        cy.get('#streetValidate').type(form.street).
            should('have.value', form.street)
        cy.get('#buildingValidate').type(form.buildingNumber).
            should('have.value', form.buildingNumber)
        cy.get('#deliveryTypeValidate').select(form.deliveryType).
            should('have.value', form.deliveryType)
        cy.get('#paymentMethodValidate').select(form.paymentMethod).
            should('have.value', form.paymentMethod)
    })
})

describe('check validation after form has been filled', () => {
    it('check validation', () => {
        cy.get('.valid-feedback').
            should('be.visible').
            and('have.class', 'valid-feedback')
    })
})

describe('check form values still in after changing page', () => {
    it('check inputs', () => {
        cy.get('a > .btn').click()
        cy.get('[href="/checkout"] > .cart-btns').click()
        cy.get('#firstNameValidate').
            should('have.value', form.firstName)
        cy.get('#lastNameValidate').
            should('have.value', form.lastName)
        cy.get('#emailValidate').
            should('have.value', form.email)
        cy.get('#phoneValidate').
            should('have.value', form.contactPhone)
        cy.get('#cityValidate').
            should('have.value', form.city)
        cy.get('#streetValidate').
            should('have.value', form.street)
        cy.get('#buildingValidate').
            should('have.value', form.buildingNumber)
     })
})
