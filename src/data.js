export default class Data {
  async allUsers() {
    let response = await fetch('https://some.example.com/allUsers');
    if (!response.ok) {
      throw new Error(`Response not 2xx.  Status Code ${response.status}`);
    }
    return await response.json();
  }

  async lookupUser(userId) {
    let response = await fetch(`https://some.example.com/api/v1/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Response not 2xx.  Status Code ${response.status}`);
    }
    return await response.json();
  }
}