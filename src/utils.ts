

import { LoremIpsum } from "lorem-ipsum"
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
})
export const loadNewResults = <T>(no: number, t: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(
                Array(10)
                    .fill(1)
                    .map((_) => ({
                        title: lorem.generateSentences(1),
                        content: lorem.generateSentences(5),
                    }))
            )
        }, t * 1000)
    }) as unknown as Promise<T[]>
}


  // const pages = useMemo(() => {
  //   return [...results].reduce((sum: Promise<Result>[][], current, index) => {
  //     let i = Math.floor(index / PAGE_SIZE)
  //     if (!sum[i]) {
  //       sum.push([])
  //     }
  //     sum[i].push(current)
  //     return sum
  //   }, [])
  // }, [results])