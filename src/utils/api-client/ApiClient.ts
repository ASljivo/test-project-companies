import { AxiosRequestConfig, AxiosResponse } from "axios";
import configureAPI from "./configure";

export interface ServerError {
  code: number;
  message: string;
}

export type Response<T> = AxiosResponse<T>;

export type ResponseError = AxiosResponse<ServerError>;

export interface Created {
  id: string;
}

const clientAPI = configureAPI();

class ApiClient {
  static get<T = unknown, U = unknown>(
    url: string,
    params?: unknown
  ): Promise<Response<U>> {
    return clientAPI.get<T, Response<U>>(url, { params });
  }

  static post<T = unknown, U = unknown>(
    url: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ): Promise<Response<U>> {
    return clientAPI.post<T, Response<U>>(url, data, params);
  }

  static put<T = unknown, U = unknown>(
    url: string,
    data: T
  ): Promise<Response<U>> {
    return clientAPI.put<T, Response<U>>(url, data);
  }

  static delete<T, U>(url: string): Promise<Response<U>> {
    return clientAPI.delete<T, Response<U>>(url);
  }
}

export default ApiClient;
