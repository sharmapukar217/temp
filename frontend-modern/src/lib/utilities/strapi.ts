import { BYPASS_TOKEN } from "$env/static/private";
import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

import qs from 'qs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class StrapiSDK {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseURL: string, authToken?: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      this.defaultHeaders['Authorization'] = `Bearer ${authToken}`;
    }
  }

  private async sendRequest<T>(
    url: string,
    method: HttpMethod,
    queryParams?: Record<string, any>,
    data?: any
  ): Promise<T> {
    const queryString = queryParams ? qs.stringify(queryParams, { encodeValuesOnly: true }) : '';

    const requestOptions: RequestInit = {
      method,
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(this.baseURL + url + (queryString ? `?${queryString}` : ''), requestOptions);
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong.');
    }

    return response.json();
  }

  async get<T>(url: string, queryParams?: Record<string, any>): Promise<T> {
    return this.sendRequest<T>(url, 'GET', queryParams);
  }

  async post<T>(url: string, data: any, queryParams?: Record<string, any>): Promise<T> {
    return this.sendRequest<T>(url, 'POST', queryParams, data);
  }

  async put<T>(url: string, data: any, queryParams?: Record<string, any>): Promise<T> {
    return this.sendRequest<T>(url, 'PUT', queryParams, data);
  }

  async delete<T>(url: string, queryParams?: Record<string, any>): Promise<T> {
    return this.sendRequest<T>(url, 'DELETE', queryParams);
  }
}

// setting up base url and token from env
export const strapi = new StrapiSDK(PUBLIC_STRAPI_BASE_URL, BYPASS_TOKEN);

// Example fetch request
// const queryParams = {
//   param1: 'value1',
//   param2: 'value2',
// };

// // GET request with query parameters
// const response = await strapi.get<{ data: any }>('/endpoint', queryParams);
// console.log(response);

// const postData = {
//   name: 'John Doe',
//   age: 30,
// };

// // POST request with query parameters and request body
// const postResponse = await strapi.post<{ id: number }>('/create', postData, queryParams);
// console.log(postResponse);
