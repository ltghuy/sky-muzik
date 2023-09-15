import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getDetailPlaylist = async (id: string) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.DETAIL_PLAYLIST, {
      params: {
        id: id
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getDetailPlaylist }
