import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getSearch = async (keyword: string) => {
  try {
    const data = await axios.get(API_ROUTES.SEARCH, {
      params: {
        keyword: keyword
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getSearch }
