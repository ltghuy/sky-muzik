import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AudioState } from '../../types/common'

export interface CounterState {
  value: number
}

const initialState: AudioState = {
  songID: localStorage.getItem("songId") || "",
  isPlay: false,
  isMute: false,
  isLoop: false,
  isShuffle: false,
  isLyric: false,
  autoPlay: false,
  currentIndexPlaylist: 0,
  currentAlbum: localStorage.getItem("currentAlbum") || "",
  infoSong: {
    title: "",
    thumbnail: "",
    artists: [],
    artistsNames: ""
  },
  srcAudio: "",
  currentTime: 0,
  duration: 0,
  volume: Number(localStorage.getItem("volume")) || 0.5,
  playListSong: []
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    changePlayIcon: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload
    },
    changeVolumeIcon: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload
    },
    setSrcAudio: (state, action: PayloadAction<string>) => {
      state.srcAudio = action.payload
    },
    setCurrentIndexPlaylist: (state, action: PayloadAction<number>) => {
      state.currentIndexPlaylist = action.payload
    },
    setCurrentAlbum: (state, action: PayloadAction<string>) => {
      state.currentAlbum = action.payload
    },
    setAutoplay: (state, action: PayloadAction<boolean>) => {
      state.autoPlay = action.payload
    },
    setSongId: (state, action: PayloadAction<string>) => {
      state.songID = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload
    },
    setOpenLyric: (state, action: PayloadAction<boolean>) => {
      state.isLyric = action.payload
    },
    setInfoSong: (state, action: PayloadAction<object>) => {
      state.infoSong = {
        ...state.infoSong,
        ...action.payload
      }
    },
    setPlaylistSong: (state, action: PayloadAction<Array<object>>) => {
      state.playListSong = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  setSrcAudio,
  changePlayIcon,
  changeVolumeIcon,
  setCurrentIndexPlaylist,
  setAutoplay,
  setSongId,
  setCurrentTime,
  setCurrentAlbum,
  setDuration,
  setLoop,
  setShuffle,
  setOpenLyric,
  setInfoSong,
  setPlaylistSong,
  setVolume
 } = audioSlice.actions

export default audioSlice.reducer
