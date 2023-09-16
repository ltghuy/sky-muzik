import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { MvListResponse, MvWithUrl, mvServices } from "@services/mv";

export const useMV = (id: string, page: number, count: number) => {
  return useQuery<
    MvListResponse,
    ResponseError,
    any,
    [QUERY_KEYS.MV_LIST, {}]
  >({
    queryKey: [QUERY_KEYS.MV_LIST, { id, page, count }],
    queryFn: context =>
      mvServices.getList(context, id, page, count),
    onError: error => {
      console.log(error)
    },
    staleTime: 60000,
    keepPreviousData: true,
    enabled: Boolean(id)
  });
};

export const useMVDetail = (id: string) => {
  return useQuery<
    MvWithUrl,
    ResponseError,
    any,
    [QUERY_KEYS.MV_DETAIL, {}]
  >({
    queryKey: [QUERY_KEYS.MV_DETAIL, { id }],
    queryFn: context =>
      mvServices.getMVDetail(context, id),
    onError: error => {
      console.log(error)
    },
    enabled: Boolean(id)
  });
};