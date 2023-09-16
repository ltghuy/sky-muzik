import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'

const getLyric = async (id: string) => {
  const response = await axios.get<unknown>(API_ROUTES.LYRIC, {
    params: { id }
  })
  return response
};

export const lyricServices = {
  getLyric
};
