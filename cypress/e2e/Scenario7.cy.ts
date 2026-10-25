import { authApi } from '../support/pages/authApi';

const testValues = {
    username: 'emilys',
    password: 'emilyspass',
    expectedGender: 'female',
    expectedFirstName: 'Emily',
    expectedLastName: 'Johnson'
}

describe('Scenario 7 - API Auth', function ()
{
    it('POST and GET', function(){
        authApi.login(testValues.username, testValues.password).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body, null, 2));

            const token: string = response.body.accessToken;
            cy.log(token)

            // could use a JWT decoder to check what's inside this token (https://www.jwt.io/)

            authApi.getMe(token).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.username).to.eq(testValues.username);
                expect(response.body.gender).to.eq(testValues.expectedGender);
                expect(response.body).to.include({ firstName: testValues.expectedFirstName, lastName: testValues.expectedLastName });
            });
        });
    })
})