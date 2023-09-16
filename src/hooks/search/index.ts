import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { searchServices } from "@services/search";

export const useSearch = (keyword: string) => {
  return useQuery<
    unknown,
    ResponseError,
    any,
    [QUERY_KEYS.SEARCH, {}]
  >({
    queryKey: [QUERY_KEYS.SEARCH, { keyword }],
    queryFn: context =>
      searchServices.getSearch(context, keyword),
    onError: error => {
      console.log(error)
    },
    enabled: Boolean(keyword)
  });
};