export interface PlaylistDetailProps {
  thumbnailM?: string,
  title?: string,
  contentLastUpdate?: number,
  description?: string,
  artists?: {
    id: string
    name: string,
    alias: string
  }[],
  like?: number,
  song?: {
    items : Array<Object>,
    totalDuration: number
  }
}

export interface SongProps {
  index: number,
  title: string,
  thumbnail: string,
  encodeId: string,
  duration: number,
  streamingStatus: number,
  artists: [],
  artistsNames?: string,
  album?: any
}

export interface AudioState {
  songID: string,
  isPlay: boolean,
  isMute: boolean,
  isLoop: boolean,
  isLyric: boolean,
  autoPlay: boolean,
  currentIndexPlaylist: number,
  infoSong: {
    title: string,
    thumbnail: string,
    artists: Array<object>,
    artistsNames: string,
    album: any
  },
  srcAudio: string,
  currentTime: number,
  duration: number,
  volume: number,
  playListSong: Array<object>
}
