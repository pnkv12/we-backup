const API_URL = "https://bffb-14-226-238-211.ap.ngrok.io/v1.0";
const https://bffb-14-226-238-211.ap.ngrok.io/v1.0 = "http://localhost:3000";

describe("Login status", () => {
  before(() => {
    cy.visit(`${https://bffb-14-226-238-211.ap.ngrok.io/v1.0}/login`);
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
//         cy.visit(`${https://bffb-14-226-238-211.ap.ngrok.io/v1.0}/login`);
//         cy.get('input[name="username"]').type("trong@gmail.com")
//             .get('input[name="password"]').type("trongvip")
//             .get('button[type="submit"]').click();
//     })
//     it("check status login", () => {
//         cy.request('')
//     });
// })
