import { API_ROUTES } from "@constants/apiRoutes";
import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_API}${process.env.REACT_APP_PATH_API}`,
  timeout: 0
})

instance.interceptors.response.use(
  async (response) => {
    if (response.config?.url?.includes(API_ROUTES.SONG) && response.data.err === -1110 && response.data.url) {
      // Make a new request through your proxy
      try {
        const newResponse = await axios.get(`${window.location.origin}?url=${encodeURIComponent(response.data.url)}`, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        return newResponse.data
      } catch (newError) {
        return Promise.reject(newError)
      }
    }
    return response.data.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
