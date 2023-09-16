import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { PlayListProps } from "@models/common";
import { top100Services } from "@services/top100";

export const useTop100 = () => {
  return useQuery<
  PlayListProps,
    ResponseError,
    any,
    [QUERY_KEYS.TOP_100, {}]
  >({
    queryKey: [QUERY_KEYS.TOP_100, {}],
    queryFn: context =>
    top100Services.getTop100( context),
    onError: error => {
      console.log(error)
    },
    staleTime: 60000,
  });
};