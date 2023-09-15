import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getSong = async (id: string) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.SONG, {
      params: {
        id: id
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

const getSongInfo = async (id: string) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.INFOSONG, {
      params: {
        id: id
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getSong, getSongInfo }
