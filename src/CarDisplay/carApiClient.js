import axios from "axios";

const carApiBaseUrl = () => {
  return "http://www.cartrawler.com/ctabe";
};

let axiosInstance;

export class CarApiClient {
  static getConfig() {
    return {
      baseURL: carApiBaseUrl(),
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  static getInstance() {
    if (axiosInstance) {
      return axiosInstance;
    } else {
      const config = CarApiClient.getConfig();
      axiosInstance = axios.create(config);
      return axiosInstance;
    }
  }
}

const carApiClient = CarApiClient.getInstance;
export default carApiClient;
