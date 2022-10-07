import axios from "axios";

// const BASE_URL = "https://sine.capital/";
export const BASE_URL = "https://dash.sine.capital/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error?.response?.status === 401) {
    //   errorToast(error?.response?.data?.message);
    //   navigationRef?.current?.reset({index: 0, routes: [{name: 'Welcome'}]});
    //   store.dispatch({type: 'LOGOUT'});
    //   throw error;
    // } else
    throw error;
  }
);

export default axiosInstance;
