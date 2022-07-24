export class Api {
  // private API_ORIGIN: string
  //
  // constructor() {
  //     this.API_ORIGIN = 'https://api.dev.ntuscse.com'
  // }

  // http methods
  // eslint-disable-next-line class-methods-use-this
  async get(urlPath: string): Promise<Record<string, any>> {
    const response = await fetch(`https://api.dev.ntuscse.com${urlPath}`);
    return response.json();
  }

  // eslint-disable-next-line class-methods-use-this
  async getProducts() {
    try {
      const res = await this.get("/products");
      return res.json();
    } catch (e) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getProduct(productId: string) {
    try {
      const res = await this.get(`/product/${productId}`);
      return res.json();
    } catch (e) {
      return null;
    }
  }
}

export const api = new Api();
