
const API_URL = 'http://localhost:8000'
const BASE_URL = "http://localhost:3000";

describe('Login status', () => {
    before(() => {
        cy.visit(`${BASE_URL}/login`);
        // cy.get('input[name="username"]').type("trong@gmail.com")
        //     .get('input[name="password"]').type("trongvip")
        //     .get('button[type="submit"]').click();
    })
    it("check status login", () => {
        cy.request("POST", `${API_URL}/users/login`, {
            email: "trong@gmail.com",
            password: "trongvip"
        }).should(res => {
            expect(res.status).to.equal(200)
        })
    });

    // it("check status does/not/exist", () => {
    //     cy.request("POST", `${API_URL}/does/not/exist`, {
    //         email: "trong@gmail.com",
    //         password: "trongvip"
    //     }).should(res => {
    //         expect(res.status).to.equal(404)
    //     })
    // });
})


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