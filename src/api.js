import axios from 'axios';
import qs from 'qs';
import { parseAPIError } from './utils/errors';
import { API_URL } from './urls';

const baseOptions = {
  headers: {},
  timeout: 30000,
};

export const setHeaders = (headers = {}) => {
  const { token } = headers;
  if (token) {
    baseOptions.headers.Authorization = `Token ${token}`;
  } else {
    baseOptions.headers = {
      'Access-Control-Allow-Origin': '*'
    };
  }
};

export const request = ({
  method,
  url,
  data = {},
}) => {
  
  const errorWrapper = (jxr) => {
    const status = jxr.response && jxr.response.status;
    if (status === 500) {
      return Promise.reject('Something went wrong.');
    }
    return Promise.reject(parseAPIError(jxr));
  };

  if (method === "get") {
    const query = Object.keys(data).length ? `?${qs.stringify(data)}` : '';
    console.log(`${API_URL}${url}${query}`);
    return axios.get(`${API_URL}${url}${query}`, baseOptions).then(
      (response) => (response),
      (err) => errorWrapper(err)
    );
  }

  if (method === "delete") {
    return axios.delete(`${API_URL}${url}`, baseOptions).then(
      (response) => response,
      (err) => errorWrapper(err)
    );
  }

  return axios[method](`${API_URL}${url}`, data, baseOptions).then(
    (response) => response,
    (err) => errorWrapper(err)
  );
};
