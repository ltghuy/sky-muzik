import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query';
import { Banner, PlaylistDetailProps } from '@models/common';

enum SECTION_TYPE {
  BANNER = 'banner',
  PLAYLIST = 'playlist'
}

interface dataType {
  items: [],
  sectionType: SECTION_TYPE
}

const getPlaylist = async (
  context: QueryFunctionContext,
) => {
  const response = await axios.get<PlaylistDetailProps, any>(API_ROUTES.HOME, {
    signal: context.signal
  })
  return response.items.filter((e: dataType) => e.sectionType === SECTION_TYPE.PLAYLIST)
};

const getBanner = async (
  context: QueryFunctionContext,
) => {
  const response = await axios.get<Banner, any>(API_ROUTES.HOME, {
    signal: context.signal
  })
  const data = response.items.find((e: dataType) => e.sectionType === SECTION_TYPE.BANNER)
  return Array.from(data.items)
};

export const homeServices = {
  getPlaylist,
  getBanner
};
