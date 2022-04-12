/// <reference types="cypress" />
const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const FilterBtn =
  "/html/body/div[1]/div/main/div/div[1]/div[1]/div/div/div[2]/div/div/div";
const ideaLink1 =
  "#root div main div div.MuiBox-root.css-1p83slw ul:nth-child(1) li div span span a";
const ideaLink2 =
  "#root div main div div.MuiBox-root.css-1p83slw ul:nth-child(2) li div span span a";

const username = Cypress.env("username");
const password = Cypress.env("password");

const titleName1 = "Test 1";
const titleName2 = "Mới chơi Genshin hoặc còn yếu thì chơi nhân vật nào?";

describe("Test existed elements", () => {
  beforeEach(() => {
    cy.visit(`${baseURL}/ideas`);
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);
    cy.get('button[type="submit"]').click();
  });

  it("should show the first and second idea", () => {
    cy.get(ideaLink1).should("be.visible");

    cy.get(ideaLink1).click();
    cy.wait(2000);
    cy.xpath("//h4").should("have.text", titleName1);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${baseURL}/ideas`);
    cy.get(ideaLink2).should("be.visible");
    cy.get(ideaLink2).click();
    cy.wait(2000);
    cy.xpath("//h4").should("have.text", titleName2);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${baseURL}/ideas`);
  });

  it("should test the + New Button and back", () => {
    cy.wait(2000);
    cy.xpath("//a[text()='New']").should("be.visible").click();
    cy.url().should("eq", `${baseURL}/ideas/ideacreate`);
    cy.wait(2000);
    cy.xpath("//a[text()=' Back']").should("be.visible").click();
    cy.url().should("eq", `${baseURL}/ideas`);
  });
});

describe("Test idea dynamically", () => {
  let ideaId1;
  let ideaId2;
  beforeEach(() => {
    cy.visit(`${baseURL}/ideas`);
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

  after(() => {
    cy.get('svg[data-testid="PersonIcon"]').click();
    cy.xpath('//p[text()=" Logout"]').click();
  });
});
