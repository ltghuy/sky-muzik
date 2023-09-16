import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_API}${process.env.REACT_APP_PATH_API}`,
  timeout: 0
})

// custom response
instance.interceptors.response.use(
  (response) => {
    return response.data.data
  }, function (error) {
    return Promise.reject(error);
  });


export default instance
