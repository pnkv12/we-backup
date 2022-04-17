/// <reference types="cypress" />

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

describe("User can log in", () => {
  beforeEach(() => {
    cy.visit(`${baseURL}/login`);
    cy.reload();
  });

  it("User can be redirected to main page after loggin in", () => {
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", `${baseURL}`);
    cy.get('svg[data-testid="PersonIcon"]').click();
    cy.xpath('//li//a[text()="manager"]').should("have.text", "manager");
  });

  it("User logs out successfully", () => {
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]/parent::li').click();
  });
});
