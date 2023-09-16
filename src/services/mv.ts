import axios from '@utils/axios'
import { API_ROUTES } from '@constants/apiRoutes'
import { QueryFunctionContext } from 'react-query'
import { MVProps } from '@models/common'

// const getMVDetail = async (id: string) => {
//   try {
//     const data = await axios.get<any, any>(API_ROUTES.VIDEO, {
//       params: {
//         id: id
//       }
//     })
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// export { getMVDetail }

export interface MvListResponse {
  hasMore: boolean,
  items: MVProps[],
  total: number
}

export interface MvWithUrl extends MVProps {
  streaming: {
    mp4: {
      '480p': string,
      '720p': string
    }
  },
  recommends: []
}

const getList = async (
  context: QueryFunctionContext,
  id: string,
  page: number,
  count: number
) => {
  const response = await axios.get<MvListResponse, any>(API_ROUTES.LIST_MV, {
    params: {
      id,
      page,
      count
    },
    signal: context.signal
  })
  return response
};

const getMVDetail = async (
  context: QueryFunctionContext,
  id: string,
) => {
  const response = await axios.get<MvWithUrl, any>(API_ROUTES.VIDEO, {
    params: {
      id
    },
    signal: context.signal
  })
  return response
};

export const mvServices = {
  getList, 
  getMVDetail
};
