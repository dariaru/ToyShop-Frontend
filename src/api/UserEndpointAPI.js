import Cookies from 'universal-cookie';


export default class UserEndpointAPI {
  static {
    this.baseEndpointURL = 'http://127.0.0.1:8000'
    this.cookies = new Cookies()
  }

  static async authenticate(username, password) {
    const response = await fetch(this.baseEndpointURL + '/login', {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    let data = await response.json()
    return data;
  }

  static async authenticateBySessionKey() {
    const response = await fetch(this.baseEndpointURL + '/authenticated', {
      credentials: 'include',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    return await response.json();
  }

  static async register(username, password) {
    const response = await fetch(this.baseEndpointURL + '/api/register/', {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    return await response.json()
  }

  static async logout() {
    const response = await fetch(this.baseEndpointURL + '/logout', {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }) 
      return await response.json()
  }
}
