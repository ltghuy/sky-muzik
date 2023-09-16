import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';

const getSearch = async (
  context: QueryFunctionContext,
  keyword: string
) => {
  const response = await axios.get<unknown>(API_ROUTES.SEARCH, {
    params: {keyword},
    signal: context.signal
  })
  return response
};

export const searchServices = {
  getSearch
};
