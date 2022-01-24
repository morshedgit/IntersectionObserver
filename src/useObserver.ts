import { useEffect, useState, createRef, RefObject, useMemo } from "react";

export const useObserver = (count: number) => {
  const observerOptions = {
    threshold: 0.1
  };

  const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  const [els, setEls] = useState<{ visibile: boolean; id: string }[]>([]);

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(count)
        .fill(1)
        .map((_, i) => elRefs[i] || createRef())
    );
    setEls((els) =>
      Array(count)
        .fill(1)
        .map((_, i) => els[i] || ({ visibile: false, id: Math.random().toString(32) }))
    );
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver((enteries, appearOnScroll) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) {

          const el = entry.target;
          console.log(el.id)
          setEls((preEls) => {
            return preEls.map((e) => {
              if (e.id === el.id) {
                return {
                  ...e,
                  visibile: true
                };
              }
              return e;
            });
          });

        }
      });
    }, observerOptions);

    elRefs.forEach((ref, i) => {
      if (ref.current) {

        if (els[i].visibile) {
          observer.unobserve(ref.current)
        } else {
          observer.observe(ref.current)
        }
        // observer.observe(ref.current)

      }
    });
  }, [elRefs]);

  const observedCounter = useMemo(() => {
    return els.filter((el) => el.visibile).length;
  }, [els]);

  useEffect(() => {
  }, [els])



  return { elRefs, elIds: els, observedCounter };
};
