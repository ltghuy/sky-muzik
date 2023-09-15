import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getDetailArtist = async (name: string) => {
  try {
    const data = await axios.get<any, any>(API_ROUTES.ARTIST, {
      params: {
        name: name
      }
    })
    return data
  } catch(err) {
    console.log(err)
  }
}

export { getDetailArtist }
