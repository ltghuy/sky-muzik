import axios from '@utils/axios'
import { QueryFunctionContext } from 'react-query';
import { API_ROUTES } from '@constants/apiRoutes'
import { ArtistProps } from '@models/common';

const getDetail = async (
  context: QueryFunctionContext,
  name: string
) => {
      const response = await axios.get<ArtistProps>(API_ROUTES.ARTIST, {
      params: {
        name
      },
      signal: context.signal
    })
    return response
};

export const artistServices = {
  getDetail
};
