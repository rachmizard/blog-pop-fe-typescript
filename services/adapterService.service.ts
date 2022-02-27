import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class AdapterService {
  requestAPI: AxiosInstance;

  constructor() {
    this.requestAPI = axios.create({
      baseURL: "https://blog-pop.herokuapp.com/api",
    });

    this.requestAPI.interceptors.request.use((config) =>
      this.interceptToken(config)
    );

    this.requestAPI.interceptors.response.use(
      (onFullfilled) => onFullfilled,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.removeItem("auth");

            location.href = "/login";

            throw new Error(error.response.data.message);
          }

          throw new Error(error.response.data.message);
        }
        throw error;
      }
    );
  }

  interceptToken(config: AxiosRequestConfig) {
    const getAuthLs: any = localStorage.getItem("auth");

    const token = JSON.parse(getAuthLs);

    const axiosConfig = config;

    if (token?.["auth-user"]?.accessToken) {
      axiosConfig.headers!.Authorization = `${token?.["auth-user"]?.accessToken}`;
    }

    return config;
  }

  sendGetRequest(url: string, params = {}) {
    return this.requestAPI.get(url, { params });
  }

  sendPostRequest(url: string, body = {}, params = {}) {
    return this.requestAPI.post(url, body, { params });
  }

  sendPutRequest(url: string, body = {}, params = {}) {
    return this.requestAPI.put(url, body, { params });
  }

  sendDeleteRequest(url: string, body = {}) {
    return this.requestAPI.delete(url, { data: body });
  }
}
