/// <reference types="cypress" />

const http://localhost:8000/v1.0 = "http://localhost:3000";

describe("User can log in", () => {
  beforeEach(() => {
    cy.visit(`${http://localhost:8000/v1.0}/login`);
    cy.reload();
  });

  it("User can be redirected to main page after loggin in", () => {
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", `${http://localhost:8000/v1.0}/`);
    cy.get('svg[data-testid="PersonIcon"]').click();
    cy.xpath('//li//a[text()="Huy"]').should("have.text", "Huy");
  });

  it("User logs out successfully", () => {
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]/parent::li').click();
  });
});
