import axios, { AxiosInstance } from "axios";
import AuthHelper from "../../helpers/AuthHelper";
import { HOME } from "../../routes/routePaths";

const baseURL = process.env.REACT_APP_API_URL as string;

const configureAPI = (): AxiosInstance => {
  const clientAPI: AxiosInstance = axios.create({
    baseURL,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });

  clientAPI.interceptors.request.use(function (config) {
    const token = AuthHelper.getToken();
    config.headers["Authorization"] = token ? `Bearer ${token}` : undefined;
    return config;
  });

  clientAPI.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        window.location.href = HOME;
        AuthHelper.removeAuth();
      }
      return Promise.reject();
    }
  );

  return clientAPI;
};

export default configureAPI;
