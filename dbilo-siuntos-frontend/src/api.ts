import axios, { AxiosRequestConfig } from 'axios';

import { ApiRequestConfig, ApiQueryParams } from './apiUtils';

const host = process.env.REACT_APP_WEB_API_URL;

axios.defaults.baseURL = `${host}/`;
axios.defaults.timeout = 30000;
axios.defaults.headers.common = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const performRequest = async <TResponse>(config: ApiRequestConfig) => {
  const response = await axios.request<TResponse>({ withCredentials: false, ...config });
  return response.data;
};

const performGet = <TResponse>(
  url: string,
  params: ApiQueryParams = {},
  withCredentials?: boolean
) =>
  performRequest<TResponse>({
    method: 'get',
    params,
    url,
    withCredentials: Boolean(withCredentials),
  });

const performPost = <TResponse>(
  url: string,
  data: Record<string, unknown> = {},
  withCredentials?: boolean
) =>
  performRequest<TResponse>({
    data,
    method: 'post',
    url,
    withCredentials: Boolean(withCredentials),
  });

const performPatch = <TResponse>(url: string, data: Record<string, unknown> = {}) =>
  performRequest<TResponse>({
    data,
    method: 'patch',
    url,
  });

const performPut = <TResponse>(url: string, data: Record<string, unknown> = {}) =>
  performRequest<TResponse>({
    data,
    method: 'put',
    url,
  });

const performDelete = <TResponse>(
  url: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
) =>
  performRequest<TResponse>({
    ...config,
    data,
    method: 'delete',
    url,
  });

export const api = {
  delete: performDelete,
  get: performGet,
  patch: performPatch,
  post: performPost,
  put: performPut,
};
