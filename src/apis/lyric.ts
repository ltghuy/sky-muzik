import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getLyric = async (id: string) => {
  try {
    const data = await axios.get(API_ROUTES.LYRIC, {
      params: {
        id: id
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export { getLyric }
