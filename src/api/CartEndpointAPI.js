import Cookies from 'universal-cookie';


export default class CartEndpointAPI {
  static {
    this.cartURL = 'http://127.0.0.1:8000/basket/';
    this.toysURL = 'http://127.0.0.1:8000/toys/';
    this.cookies = new Cookies()
  }

  static async fetchItems(user) {
    const cartItemComparator = (a, b) => {
      if (a.toy.pk < b.toy.pk) return -1;
      if (a.toy.pk > b.toy.pk) return 1;
      return 0;
    }

    try {
      const cartItemsResponse = await fetch(this.cartURL + `?user=${user}`);
      const cartItems = await cartItemsResponse.json();

      // Build query string to fetch the list.
      const toyIds = cartItems.sort(cartItemComparator).map(item => "id=" + item.toy.toString());
      const queryString = toyIds.join('&');

      const toysResponse = await fetch(this.toysURL + `?${queryString}`);
      const toys = await toysResponse.json();

      return cartItems.map(
        (cartItem, idx) => {
          return {
            pk: cartItem.pk,
            amount: cartItem.amount,
            toy: toys[idx]
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  static async putItem(item) {
    try {
      const request = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      }

      const response = await fetch(this.cartURL, request);
      const itemData = await response.json();
      return {
        pk: itemData.pk,
        amount: itemData.amount
      };
    } catch (e) {
      console.error(e);
    }
  }

  static async removeItem(pk) {
    const request = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    try {
      await fetch(this.cartURL + `${pk}/`, request);
    } catch (e) {
      console.error(e);
    }
  }

  static async updateItem(pk, updatedItem) {
    const request = {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem)
    };

    try {
      const response = await fetch(this.cartURL + `${pk}/`, request);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
