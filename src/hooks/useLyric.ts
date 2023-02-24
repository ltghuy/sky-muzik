import { useState, useEffect } from "react"
import { getLyric } from "../api/lyric"
import { KaraLineType, wordType } from "../types/common"

const useLyric = ( songId: string | null): any => {
  const [lyric, setLyric] = useState<Array<{ data: string }>>()

  useEffect(() => {
    (
      async () => {
        if (songId !== null && songId !== "") {
          const dataLyric: any = await getLyric(songId)

          let customLyr: KaraLineType[] = []

          dataLyric.sentences &&
          dataLyric.sentences.forEach((e: {words: wordType[]}, i: number) => {
            let lineLyric:string = ""
            let sTime: number = 0
            let eTime: number = 0
            let words: wordType[] = []

            e.words.forEach((element: wordType, index: number) => {
              words.push(element)
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
              data: lineLyric,
              words: words
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
