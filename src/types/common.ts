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
  album?: any,
  playAllList?: boolean
}

export interface AudioState {
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
    artists: Array<object>,
    artistsNames: string
  },
  srcAudio: string,
  currentTime: number,
  duration: number,
  volume: number,
  playListSong: Array<object>
}
