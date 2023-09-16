import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';

const getCharts = async (
  context: QueryFunctionContext,
) => {
  const response = await axios.get<unknown>(API_ROUTES.CHART_HOME, {
    signal: context.signal
  })
  return response
};

export const chartHomeServices = {
  getCharts
};
