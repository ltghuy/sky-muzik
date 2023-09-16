import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { chartHomeServices } from "@services/charts";

export const useCharts = () => {
  return useQuery<
    unknown,
    ResponseError,
    any,
    [QUERY_KEYS.CHARTS, {}]
  >({
    queryKey: [QUERY_KEYS.CHARTS, {}],
    queryFn: context =>
    chartHomeServices.getCharts( context),
    onError: error => {
      console.log(error)
    },
    staleTime: 60000,
    refetchInterval: 300000,
    keepPreviousData: true,
  });
};