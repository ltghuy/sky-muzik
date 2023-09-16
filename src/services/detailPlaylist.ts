import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';

const getDetail = async (
  context: QueryFunctionContext,
  id: string
) => {
  const response = await axios.get<unknown>(API_ROUTES.DETAIL_PLAYLIST, {
    params: { id },
    signal: context.signal
  })
  return response
};

export const detailPlaylistServices = {
  getDetail
};