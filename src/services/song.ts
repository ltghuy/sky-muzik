import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';
import { SongProps } from '@models/common';

const getSong = async (
  context: QueryFunctionContext,
  id: string
) => {
  const response = await axios.get<SongProps, any>(API_ROUTES.SONG, {
    params: {
      id
    },
    signal: context.signal
  })
  return response
};

const getSongInfo = async (
  context: QueryFunctionContext,
  id: string
) => {
  const response = await axios.get<SongProps, any>(API_ROUTES.INFO_SONG, {
    params: { id },
    signal: context.signal
  })
  return response
};

export const songServices = {
  getSong,
  getSongInfo
};
