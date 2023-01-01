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
  },
  isCurrentPlaylist?: boolean
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
    thumbnailM: string,
    artists: Array<object>,
    artistsNames: string,
    hasLyric?: boolean,
    mvlink?: string
  },
  srcAudio: string,
  currentTime: number,
  duration: number,
  volume: number,
  playListSong: Array<object>
}

export interface ArtistProps {
  cover: string,
  name: string,
  totalFollow: number,
  thumbnailM: string,
  biography: string,
  awards: [],
  sections: [],
}

export interface MVProps {
  title: string,
  encodeId: string,
  thumbnailM: string,
  artist: {
    name: string,
    alias: string,
    thumbnail: string
  },
  artistsNames: string
}
