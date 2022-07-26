import { productList } from "../data/mock/product";
import { voucherList } from "../data/mock/voucher";
import { fakeDelay } from "../utils/functions/random";

const QUERY_DELAY_TIME = 1500;
const CUSTOM_MOCK_DATA = true;

export class Api {
  private API_ORIGIN: string;

  constructor() {
    this.API_ORIGIN = "https://api.dev.ntuscse.com";
  }

  // http methods
  // eslint-disable-next-line class-methods-use-this
  async get(urlPath: string): Promise<Record<string, any>> {
    const response = await fetch(`${this.API_ORIGIN}${urlPath}`);
    return response.json();
  }

  // eslint-disable-next-line class-methods-use-this
  async getProducts() {
    try {
      if (CUSTOM_MOCK_DATA) {
        await fakeDelay(QUERY_DELAY_TIME);
        return productList;
      }
      const res = await this.get("/products");
      console.log("product-list", res);
      return res?.products ?? [];
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getProduct(productId: string) {
    try {
      if (CUSTOM_MOCK_DATA) {
        await fakeDelay(QUERY_DELAY_TIME);
        return productList.find((product) => product.id === productId);
      }
      const res = await this.get(`/product/${productId}`);
      console.log("res", res);
      return res.json();
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getVoucher(voucherId: string) {
    try {
      if (CUSTOM_MOCK_DATA) {
        await fakeDelay(QUERY_DELAY_TIME);
        return voucherList.find((voucher) => voucher?.id === voucherId);
      }
      const res = await this.get(`/voucher/${voucherId}`);
      console.log("res", res);
      return res.json();
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export const api = new Api();
