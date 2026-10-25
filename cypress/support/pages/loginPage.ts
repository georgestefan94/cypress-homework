class LoginPage {
  private url = 'https://www.saucedemo.com/';

  private selectors = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
  };

  visit() {
    cy.visit(this.url);
  }

  login(username: string, password: string) {
    cy.get(this.selectors.username).type(username);
    cy.get(this.selectors.password).type(password, { log: false });
    cy.get(this.selectors.loginButton).click();
  }
}

export const loginPage = new LoginPage();