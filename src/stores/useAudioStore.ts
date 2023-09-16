import { LOCAL_STORAGE_KEYS } from "@constants/localStorageKeys"
import { create } from "zustand"

type State = {
  songID: string,
  isPlay: boolean,
  isMute: boolean,
  isLoop: boolean,
  isShuffle: boolean,
  isLyric: boolean,
  autoPlay: boolean,
  currentIndexPlaylist: number,
  currentAlbum: string,
  infoSong: {
    title: string,
    thumbnail: string,
    thumbnailM: string,
    artists: [],
    artistsNames: string,
    hasLyric: boolean,
    mvlink: string
  },
  srcAudio: string,
  currentTime: number,
  duration: number,
  volume: number,
  playListSong: any
}

type Action = {
  changePlayIcon: (payload: boolean) => void,
  changeVolumeIcon: (payload: boolean) => void,
  setSrcAudio: (payload: string) => void,
  setCurrentIndexPlaylist: (payload: number) => void,
  setCurrentAlbum: (payload: string) => void,
  setAutoplay: (payload: boolean) => void,
  setSongId: (payload: string) => void,
  setCurrentTime: (payload: number) => void,
  setDuration: (payload: number) => void,
  setLoop: (payload: boolean) => void,
  setShuffle: (payload: boolean) => void,
  setOpenLyric: (payload: boolean) => void,
  setVolume: (payload: number) => void,
  setInfoSong: (payload: object) => void,
  setPlaylistSong: (payload: object[]) => void
}

export const useAudioStore = create<State & Action>((set) => ({
  songID: localStorage.getItem(LOCAL_STORAGE_KEYS.SONG_ID) || "",
  isPlay: false,
  isMute: false,
  isLoop: false,
  isShuffle: false,
  isLyric: false,
  autoPlay: false,
  currentIndexPlaylist: Number(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_INDEX)) || 0,
  currentAlbum: localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_ALBUM) || "",
  infoSong: {
    title: "",
    thumbnail: "",
    thumbnailM: "",
    artists: [],
    artistsNames: "",
    hasLyric: false,
    mvlink: ""
  },
  srcAudio: "",
  currentTime: 0,
  duration: 0,
  volume: Number(localStorage.getItem(LOCAL_STORAGE_KEYS.VOLUME)) || 0.5,
  playListSong: [],

  changePlayIcon: (payload: boolean) => set((state) => ({
    isPlay: state.isPlay = payload
  })),
  changeVolumeIcon: (payload: boolean) => set((state) => ({
    isMute: state.isMute = payload
  })),
  setSrcAudio: (payload: string) => set((state) => ({
    srcAudio: state.srcAudio = payload
  })),
  setCurrentIndexPlaylist: (payload: number) => set((state) => ({
    currentIndexPlaylist: state.currentIndexPlaylist = payload
  })),
  setCurrentAlbum: (payload: string) => set((state) => ({
    currentAlbum: state.currentAlbum = payload
  })),
  setAutoplay: (payload: boolean) => set((state) => ({
    autoPlay: state.autoPlay = payload
  })),
  setSongId: (payload: string) => set((state) => ({
    songID: state.songID = payload
  })),
  setCurrentTime: (payload: number) => set((state) => ({
    currentTime: state.currentTime = payload
  })),
  setDuration: (payload: number) => set((state) => ({
    duration: state.duration = payload
  })),
  setLoop: (payload: boolean) => set((state) => ({
    isLoop: state.isLoop = payload
  })),
  setShuffle: (payload: boolean) => set((state) => ({
    isShuffle: state.isShuffle = payload
  })),
  setOpenLyric: (payload: boolean) => set((state) => ({
    isLyric: state.isLyric = payload
  })),
  setVolume: (payload: number) => set((state) => ({
    volume: state.volume = payload
  })),
  setInfoSong: (payload: object) => set((state) => ({
    infoSong: state.infoSong = { ...state.infoSong, ...payload }
  })),
  setPlaylistSong: (payload: any) => set((state) => ({
    playListSong: state.playListSong = payload
  })),
}))
