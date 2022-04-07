/// <reference types="cypress" />
const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const token = Cypress.env("authToken");

context("Session Storage", () => {
  beforeEach(() => {
    cy.visit(`${baseURL}/login`);
  });

  it("Clear all data in session storage", () => {
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
        // assert.isDefined(sessionStorage.getItem("uid"), token);
        expect(sessionStorage.getItem("fullname")).to.eq("Huy");
        expect(sessionStorage.getItem("email")).to.eq("trong@gmail.com");
      });

    // log out
    cy.get('[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]/parent::li')
      .click()
      .should(() => {
        assert.isNull(localStorage.getItem("fullname"));
        assert.isNull(localStorage.getItem("email"));
      });
  });
});
