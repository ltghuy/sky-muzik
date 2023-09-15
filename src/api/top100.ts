import axios from '@utils/axios' 
import { API_ROUTES } from '@constants/apiRoutes'

const getTop100 = async () => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.TOP100)
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getTop100 }
