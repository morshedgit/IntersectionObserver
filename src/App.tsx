import {
  useRef,
  forwardRef,
  useEffect,
  useState,
  createRef,
  RefObject,
  useMemo,
} from "react"
import "./styles.css"
import { useObserver } from "./useObserver"
import { useResults } from "./useResult"
import { loadNewResults } from "./utils"

type Result = {
  title: string
  content: string
}
const PAGE_SIZE = 10

const Card = (props: { info?: Result }) => {
  return (
    <div className={`card faded ${props?.info ? "visible" : "loading"}`}>
      <h1>{props?.info?.title}</h1>
      <p>{props?.info?.content}</p>
    </div>
  )
}

const Chunk = <T extends Result>(props: {
  chunk: Promise<T[]>
  chunkLength: number
}) => {
  const [chunk, setChunk] = useState<T[]>([])
  useEffect(() => {
    props.chunk.then((c) => setChunk(c))
  }, [])
  return (
    <>
      {chunk.length > 0 &&
        chunk.map((result, i) => <Card key={i} info={result as Result} />)}
      {!(chunk.length > 0) &&
        Array(props.chunkLength)
          .fill(1)
          .map((result, i) => <Card key={i} info={undefined} />)}
    </>
  )
}

const App = () => {
  const { elRefs, elIds, results } = useResults<Result>({
    PAGE_SIZE,
    INITIAL_VALUE: 1,
    loadNewResults,
  })

  return (
    <div className="App">
      <pre>{results.length}</pre>
      <div>
        {elIds.length &&
          results.map((c, i) => (
            <div
              className="container"
              ref={elRefs[i]}
              key={elIds[i]?.id}
              id={elIds[i]?.id}
            >
              <Chunk chunk={c} chunkLength={PAGE_SIZE} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
