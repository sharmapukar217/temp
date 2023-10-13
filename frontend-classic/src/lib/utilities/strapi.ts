import qs from "qs";
import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

type Fetch = typeof fetch;

type RequestParams = {
  url: string;
  fetch?: Fetch;
  body?: unknown;
  [x: string]: any;
  headers?: RequestInit["headers"];
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
};

export type StrapiError = {
  name: string;
  status: number;
  message: string;
  details: Record<string, unknown>;
};

export type StrapiResponse<T> = {
  data: T;
  meta: {};
};

export type StrapiResponseWithPagination<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      total: number;
      pageSize: number;
      pageCount: number;
    };
  };
};

/**
 * Strapi Api Sdk to consume apis
 **/
class Strapi {
  token?: string;
  baseUrl!: string;
  fetch: Fetch = fetch;

  setToken(token: string) {
    this.token = token;
  }

  constructor(baseUrl?: string) {
    if (!PUBLIC_STRAPI_BASE_URL && !baseUrl) {
      console.error(`
        Please set \`PUBLIC_STRAPI_BASE_URL\` to environment variable,
        or provide the base url to constructor to consume this sdk.
      `);
      baseUrl = ""; // to satisfy typescript :)
    } else {
      // load base url
      this.baseUrl = baseUrl || PUBLIC_STRAPI_BASE_URL;
    }
  }

  async request<T = unknown>({
    url,
    body,
    fetch,
    method,
    headers,
    ...params
  }: RequestParams): Promise<
    { result: T; error: undefined } | { result: undefined; error: StrapiError }
  > {
    // create search query from params for strapi filters/select/populate
    const query = qs.stringify(params, { encodeValuesOnly: true });

    // set custom fetch if provided
    if (fetch) this.fetch = fetch;
    // request config
    const init: RequestInit & {
      headers: Headers;
    } = { method, headers: new Headers(headers) };

    // set authorization header
    if (this.token) init.headers.set("authorization", `Bearer ${this.token}`);

    // JSON.stringify body and append, if method is not `GET`
    if (method !== "GET" && body) init.body = JSON.stringify(body);

    try {
      // create a new URL, this is inside try block because
      // if PUBLIC_STRAPI_BASE_URL is not defined, this would be
      // an invalid url
      const apiUrl = new URL(url, this.baseUrl);

      // set search params if query is non empty string
      if (query) apiUrl.search = query;

      const response = await this.fetch(apiUrl.toString(), init);
      const json = await response.json();

      if (response.ok) {
        return { result: json as T, error: undefined };
      } else {
        return { result: undefined, error: json.error as StrapiError };
      }
    } catch (error) {
      return {
        result: undefined,
        error: {
          details: {},
          status: 500,
          name: "InternalServerError",
          message: "Oops! Something went wrong"
        }
      };
    }
  }

  async get<TData>(url: string, rest: Record<string, unknown>) {
    return await this.request<TData>({ method: "GET", url, ...rest });
  }

  async put<TData>(url: string, rest: Record<string, unknown>) {
    return await this.request<TData>({ method: "PUT", url, ...rest });
  }

  async post<TData>(url: string, rest: Record<string, unknown>) {
    return await this.request<TData>({ method: "POST", url, ...rest });
  }

  async patch<TData>(url: string, rest: Record<string, unknown>) {
    return await this.request<TData>({ method: "PATCH", url, ...rest });
  }

  async delete<TData>(url: string, rest: Record<string, unknown>) {
    return await this.request<TData>({ method: "DELETE", url, ...rest });
  }
}

export const strapi = new Strapi();
