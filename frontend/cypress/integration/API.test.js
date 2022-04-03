const API_URL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0";
const BASE_URL = "http://localhost:3000";

describe("Login status", () => {
  before(() => {
    cy.visit(`${BASE_URL}/login`);
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

  // it("check status does/not/exist", () => {
  //     cy.request("POST", `${API_URL}/does/not/exist`, {
  //         email: "trong@gmail.com",
  //         password: "trongvip"
  //     }).should(res => {
  //         expect(res.status).to.equal(404)
  //     })
  // });
});

// describe('API calls', () => {
//     before(() => {
//         cy.visit(`${BASE_URL}/login`);
//         cy.get('input[name="username"]').type("trong@gmail.com")
//             .get('input[name="password"]').type("trongvip")
//             .get('button[type="submit"]').click();
//     })
//     it("check status login", () => {
//         cy.request('')
//     });
// })
