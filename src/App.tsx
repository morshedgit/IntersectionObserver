import {
  useRef,
  forwardRef,
  useEffect,
  useState,
  createRef,
  RefObject,
  useMemo
} from "react";
import "./styles.css";
import { LoremIpsum } from "lorem-ipsum";
import { useObserver } from "./useObserver";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const loadNewResults = () => {
  return Array(10)
    .fill(1)
    .map((_) => ({
      title: lorem.generateSentences(1),
      content: lorem.generateSentences(5)
    }));
};
const PAGE_SIZE = 10;

const Card = (props: { title?: string; content?: string }) => {
  return (
    <div className={`card faded ${props.content ? "visible" : "loading"}`}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

type Result = {
  title: string;
  content: string;
};

const App = () => {
  const [pageCount, setPageCount] = useState<number>(2);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const runUpdater = async () => {
      const newResults = await loadNewResults();
      // setResults((preRes) => [...preRes, ...newResults]);
      setResults(Array(pageCount * PAGE_SIZE).fill(1));
    };

    runUpdater();
  }, []);

  const { elRefs, elIds, observedCounter } = useObserver(
    Math.ceil(results.length / PAGE_SIZE) + 1
  );

  useEffect(() => {
    console.log({ observedCounter });
    setPageCount((prevCount) => observedCounter + 1);
  }, [observedCounter]);

  const pages = useMemo(() => {
    return [...results].reduce((sum: Result[][], current, index) => {
      let i = Math.floor(index / PAGE_SIZE);
      if (!sum[i]) {
        sum.push([]);
      }
      sum[i].push(current);
      return sum;
    }, []);
  }, [results]);

  return (
    <div className="App">
      {/* <pre>{JSON.stringify({ elIds, PAGE_SIZE }, null, 2)}</pre> */}
      <pre>{pageCount}</pre>
      <div>
        {elIds.length &&
          elRefs.length &&
          pages.map((chunk, i) => (
            <div
              className="container"
              ref={elRefs[i]}
              key={elIds[i]?.id}
              id={elIds[i]?.id}
            >
              <div>ContainerId: {elIds[i]?.id}</div>
              {chunk.map((res, i) => (
                <Card key={i} title={res.title} content={undefined} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
