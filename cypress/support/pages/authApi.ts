class AuthApi {
  private baseUrl = 'https://dummyjson.com/auth';

  login(username: string, password: string) {
    return cy.request('POST', `${this.baseUrl}/login`, {
      username: username,
      password: password,
    });
  }

  getMe(token: string) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/me`,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const authApi = new AuthApi();