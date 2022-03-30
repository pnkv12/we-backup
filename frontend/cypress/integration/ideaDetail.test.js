/// <reference types="cypress" />
const BASE_URL = "http://localhost:3000";
const FilterBtn =
  "/html/body/div[1]/div/main/div/div[1]/div[1]/div/div/div[2]/div/div/div";
const ideaLink1 =
  "#root div main div div.MuiBox-root.css-1p83slw ul:nth-child(1) li div span span a";
const ideaLink2 =
  "#root div main div div.MuiBox-root.css-1p83slw ul:nth-child(2) li div span span a";

const username = Cypress.env("username");
const password = Cypress.env("password");

const titleName1 = "Nga vô địch";
const titleName2 = "Nga vô địch";

describe("Test existed elements", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/ideas`);
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
  });

  it("should show the filter and search box", () => {
    cy.get('input[name="search"]').should("be.visible").type("trongvip");
    cy.xpath(FilterBtn).click();
    cy.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span[1]/input').click();
    //npm install -D cypress-xpath
  });

  it("should show the first and second idea", () => {
    cy.get(ideaLink1).should("be.visible");

    cy.get(ideaLink1).click();
    cy.wait(2000);
    cy.xpath("//h4").should("have.text", titleName1);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${BASE_URL}/ideas`);
    cy.get(ideaLink2).should("be.visible");
    cy.get(ideaLink2).click();
    cy.wait(2000);
    cy.xpath("//h4").should("have.text", titleName2);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${BASE_URL}/ideas`);
  });

  it("should test the + New Button and back", () => {
    cy.wait(2000);
    cy.xpath("//a[text()='New']").should("be.visible").click();
    cy.url().should("eq", `${BASE_URL}/ideas/ideacreate`);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${BASE_URL}/ideas`);
  });
});

describe("Test idea dynamically", () => {
  let ideaId1;
  let ideaId2;
  beforeEach(() => {
    cy.visit(`${BASE_URL}/ideas`);
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();

    cy.get(ideaLink1)
      .should("have.attr", "href")
      .then((href) => {
        ideaId1 = href.substring(7);
      });

    cy.get(ideaLink2)
      .should("have.attr", "href")
      .then((href) => {
        ideaId2 = href.substring(7);
      });
  });

  it("should show the right ideaID", () => {
    cy.get(ideaLink1).should("be.visible");
    cy.get(ideaLink1).click();

    cy.wait(1000);

    cy.xpath('//h6[text()="ID: "]').should("have.text", "ID: " + ideaId1);
  });

  it("should show the right ideaID2", () => {
    cy.get(ideaLink2).should("be.visible");
    cy.get(ideaLink2).click();

    cy.wait(1000);

    cy.xpath('//h6[text()="ID: "]').should("have.text", "ID: " + ideaId2);
  });

  after(() => {
    cy.get('svg[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]').click();
  });
});
