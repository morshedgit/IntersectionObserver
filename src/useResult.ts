import {
    useEffect,
    useState,
} from "react"
import { useObserver } from "./useObserver"
import { loadNewResults } from "./utils"

export const useResults = <T,>({ PAGE_SIZE, INITIAL_VALUE }: { PAGE_SIZE?: number, INITIAL_VALUE?: number, loadNewResults: (no: number, t: number) => Promise<T[]> }) => {

    const [pageCount, setPageCount] = useState<number>(INITIAL_VALUE ?? 1)
    const [results, setResults] = useState<Promise<T[]>[]>([])

    useEffect(() => {
        const runUpdater = async () => {
            const newResults = loadNewResults<T>(PAGE_SIZE ?? 10, 5)
            setResults((preRes) => [...preRes, newResults])
        }

        runUpdater()
    }, [pageCount])

    const { elRefs, elIds, observedCounter } = useObserver(results.length)

    useEffect(() => {
        setPageCount((prevCount) => observedCounter + 1)
    }, [observedCounter])

    return { elRefs, elIds, results }
}