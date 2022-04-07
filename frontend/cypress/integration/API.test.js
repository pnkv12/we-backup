const API_URL = "https://be-enterprise.herokuapp.com/v1.0";

describe("Login status", () => {
  before(() => {
    cy.visit(`${API_URL}/login`);
    // cy.get('input[name="username"]').type("trong@gmail.com")
    //     .get('input[name="password"]').type("trongvip")
    //     .get('button[type="submit"]').click();
  });
  it("check status login", () => {
    cy.request("POST", `${API_URL}/login`, {
      username: "huy",
      password: "123456789",
    }).should((res) => {
      expect(res.status).to.equal(200);
    });
  });

