import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { detailPlaylistServices } from "@services/detailPlaylist";

export const useDetailPlaylist = (id: string) => {
  return useQuery<
    unknown,
    ResponseError,
    any,
    [QUERY_KEYS.DETAIL_PLAYLIST, {}]
  >({
    queryKey: [QUERY_KEYS.DETAIL_PLAYLIST, { id }],
    queryFn: context =>
    detailPlaylistServices.getDetail( context, id),
    onError: error => {
      console.log(error)
    },
    enabled: Boolean(id)
  });
};