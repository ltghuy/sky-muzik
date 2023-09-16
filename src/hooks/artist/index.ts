import { QUERY_KEYS } from "@constants/queryKeys";
import { ArtistProps } from "@models/common";
import { ResponseError } from "@models/core/error";
import { artistServices } from "@services/artist";
import { useQuery } from "react-query";

export const useArtist = (
  name: string,
) => {
  return useQuery<
    unknown,
    ResponseError,
    ArtistProps,
    [QUERY_KEYS.ARTIST, { name: string }]
  >({
    queryKey: [QUERY_KEYS.ARTIST, { name }],
    queryFn: context =>
    artistServices.getDetail( context, name),
    onError: error => {
      console.log(error)
    },
  });
};