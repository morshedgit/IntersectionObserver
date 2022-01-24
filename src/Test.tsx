export const Test = () => {
  return <div>Test</div>
}

// const CardWithRef = forwardRef<
//   HTMLDivElement,
//   { visible: boolean; id: number }
// >((props, ref) => {
//   return (
//     <div ref={ref} id={props?.id?.toString()}>
//       <Card {...props} />
//     </div>
//   );
// });

// export const Cards = () => {
//   const observerOptions = {
//     threshold: 1
//   };

//   const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);
//   const [els, setEls] = useState<{ visibile: boolean; id: number }[]>([]);

//   useEffect(() => {
//     // add or remove refs
//     setElRefs((elRefs) =>
//       Array(COUNT)
//         .fill(1)
//         .map((_, i) => elRefs[i] || createRef())
//     );
//     setEls((els) =>
//       Array(COUNT)
//         .fill(1)
//         .map((item) => ({ visibile: false, id: Math.random() }))
//     );
//   }, [COUNT]);

//   useEffect(() => {
//     const observer = new IntersectionObserver((enteries, appearOnScroll) => {
//       enteries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const el = entry.target;

//           setEls((preEls) => {
//             return preEls.map((e) => {
//               if (e.id.toString() === el.id) {
//                 return {
//                   ...e,
//                   visibile: true
//                 };
//               }
//               return e;
//             });
//           });
//           // setEls()
//         }
//       });
//     }, observerOptions);

//     elRefs.forEach((ref) => {
//       if (ref.current) {
//         observer.observe(ref.current);
//       }
//     });
//   }, [elRefs]);

//   return (
//     <div className="">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Intersection Observer!</h2>

//       <div className={"content"}>
//         {Array(COUNT)
//           .fill(1)
//           .map((r, i) => (
//             <CardWithRef
//               key={i}
//               ref={elRefs[i]}
//               visible={els[i]?.visibile}
//               id={els[i]?.id}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };
