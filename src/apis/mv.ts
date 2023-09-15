import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getMVList = async (id: string, page: number, count: number) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.LIST_MV, {
      params: {
        id: id,
        page: page,
        count: count
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

const getMVDetail = async (id: string) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.VIDEO, {
      params: {
        id: id
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getMVList, getMVDetail }
