/// <reference types="cypress" />
const BASE_URL = "http://localhost:3000";
const token = Cypress.env('authToken');

context('Local Storage', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/login`);
  })

  it('cy.clearLocalStorage() - clear all data in local storage', () => {
    // log in
    cy.get('input[name="username"]')
      .should("be.visible")
      .type("trong@gmail.com")
      .get('input[name="password"]')
      .should("be.visible")
      .type("trongvip")
      .get('button[type="submit"]')
      .should("be.visible")
      .click()
      .should(() => {
        assert.isDefined(localStorage.getItem('authToken'), token)
        expect(localStorage.getItem('firstName')).to.eq('Trong')
        expect(localStorage.getItem('email')).to.eq('trong@gmail.com')
      });

    // log out
    cy.get('[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]/parent::li').click()
      .should(() => {
        assert.isNull(localStorage.getItem('authToken'));
        assert.isNull(localStorage.getItem('firstName'))
        assert.isNull(localStorage.getItem('email'))
      });
  })
})
