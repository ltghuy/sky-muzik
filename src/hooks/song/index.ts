import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { SongProps } from "@models/common";
import { songServices } from "@services/song";

export const useSong = (id: string) => {
  return useQuery<
    SongProps,
    ResponseError,
    any,
    [QUERY_KEYS.SONG, {}]
  >({
    queryKey: [QUERY_KEYS.SONG, { id }],
    queryFn: context =>
      songServices.getSong(context, id),
    onError: error => {
      console.log(error)
    },
    enabled: Boolean(id)
  });
};

export const useSongInfo = (id: string) => {
  return useQuery<
    SongProps,
    ResponseError,
    any,
    [QUERY_KEYS.SONG_INFO, {}]
  >({
    queryKey: [QUERY_KEYS.SONG_INFO, { id }],
    queryFn: context =>
      songServices.getSongInfo(context, id),
    onError: error => {
      console.log(error)
    },
    enabled: Boolean(id)
  });
};