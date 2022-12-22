import { useState, useEffect } from "react"
import { getLyric } from "../api/lyric"

const useLyric = ( songId: string | null): any => {
  const [lyric, setLyric] = useState<Array<{ data: string }>>()

  useEffect(() => {
    (
      async () => {
        if (songId !== null && songId !== "") {
          const dataLyric: any = await getLyric(songId)

          let customLyr:{ startTime: number, endTime: number,data: string }[] = []

          dataLyric.sentences &&
          dataLyric.sentences.forEach((e: {words: []}, i: number) => {
            let lineLyric:string = ""
            let sTime: number = 0
            let eTime: number = 0

            e.words.forEach((element: {data: string, startTime: number, endTime: number}, index: number) => {
              if (index === 0) {
                sTime = element.startTime
              }
              if (index === e.words.length - 1) {
                eTime = element.endTime
              }
              lineLyric = lineLyric + element.data + " "
            })
            customLyr.push({
              startTime: sTime,
              endTime: eTime,
              data: lineLyric
            })
          })

          setLyric(customLyr)
        }
      }
    )()
  }, [songId])

  return lyric
}

export default useLyric
