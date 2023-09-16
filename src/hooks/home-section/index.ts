import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/queryKeys";
import { ResponseError } from "@models/core/error";
import { homeServices } from "@services/home";
import {  PlaylistDetailProps } from "@models/common";

export const useHomePlayList = () => {
  return useQuery<
    PlaylistDetailProps,
    ResponseError,
    any,
    [QUERY_KEYS.HOME_PLAYLIST, {}]
  >({
    queryKey: [QUERY_KEYS.HOME_PLAYLIST, {}],
    queryFn: context =>
      homeServices.getPlaylist(context),
    onError: error => {
      console.log(error)
    },
    staleTime: 60000,
  });
};

export const useHomeBanner = () => {
  return useQuery<
    unknown,
    ResponseError,
    any,
    [QUERY_KEYS.HOME_BANNER, {}]
  >({
    queryKey: [QUERY_KEYS.HOME_BANNER, {}],
    queryFn: context =>
      homeServices.getBanner(context),
    onError: error => {
      console.log(error)
    },
    staleTime: 60000,
  });
};