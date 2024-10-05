import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';
import { PlayListProps } from '@models/common';

const getTop100 = async (
  context: QueryFunctionContext,
) => {
  const response = await axios.get<PlayListProps, any>(API_ROUTES.TOP_100, {
    signal: context.signal
  })
  return response
};

export const top100Services = {
  getTop100
};
