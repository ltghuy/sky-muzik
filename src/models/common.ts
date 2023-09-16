export interface PlaylistDetailProps {
  thumbnailM?: string,
  title?: string,
  contentLastUpdate?: number,
  description?: string,
  sortDescription?: string,
  artists?: {
    id: string
    name: string,
    alias: string
  }[],
  like?: number,
  song?: {
    items : SongProps[],
    totalDuration: number
  },
  isCurrentPlaylist?: boolean,
  encodeId?: string,
  artistsNames?: string,
  thumbnail?: string,
}

export interface PlayListProps {
  title: string,
  items: PlaylistDetailProps[]
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
export interface WordType  {
  startTime: number, 
  endTime: number, 
  data: string
}
export interface Banner  {
  banner: string, 
  encodeId?: string
}
export interface KaraLineType extends WordType {
  words?: WordType[]
}
