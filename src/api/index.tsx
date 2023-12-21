import axios from "axios";
import { Alert } from "components/alert";
import { get, set } from "lodash";
import { loadLocalItem, removeLocalItem } from "redux/store";

const URL = `${process.env.basePath}/backend`;

const request = axios.create({
  baseURL: URL,
});

request.interceptors.request.use(
  (config) => {
    const data = loadLocalItem("currentUser");
    const { tokens, user } = data ?? {};
    config.headers["cache-control"] = `no-cache`;

    if (tokens && config.method.toUpperCase() === "POST") {
      config.headers["authorization"] = `bearer ${tokens.accessToken}`;
      config.headers["user-client-id"] = user.usr_id;
    }

    config.withCredentials = true;
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let status = get(error, "response.status", null);
    let code = get(error, "response.data.code", null);
    let message = get(error, "response.data.message", null);

    if (code === 500 && message == "jwt expired") {
      removeLocalItem("currentUser");
      removeLocalItem("orderCarts");
      removeLocalItem("cacheData");
      const event = new Event("expirestoken");
      set(event, "error", error);
      window.dispatchEvent(event);
    } else if (status == 401) {
      window.location.href = "/auth/sign-in";
    }
    throw error;
  }
);

export interface ResponseGenerator<T extends object> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default request;
