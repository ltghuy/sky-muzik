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
  title: string,
  thumbnail: string,
  encodeId: string,
  duration: number,
  streamingStatus: number,
  artists: [],
  artistsNames?: string,
  album: any
}
