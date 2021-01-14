// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Celebrate your love for pizza, vote for it!')
    cy.get('.navbar-brand .brand-img').should('have.attr', 'src').and('include', 'pizza')
    cy.contains('.nav-link', 'Login')
    cy.get('#bar-chart')
        .should('be.visible')
  })
})
