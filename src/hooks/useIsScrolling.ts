import { MutableRefObject, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useIsScrolling = (ref: MutableRefObject<HTMLUListElement>) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isScrollingX, setIsScrollingX] = useState(false);
  const [isScrollingY, setIsScrollingY] = useState(false);

  const debouncedX = useDebounce(x, 100);
  const debouncedY = useDebounce(y, 100);

  useEffect(() => {
    const { current } = ref;

    const scrollHandler = () => {
      const { scrollLeft, scrollTop } = current;

      setX(scrollLeft);
      setY(scrollTop);

      if (current.scrollLeft) {
        setIsScrollingX(true);
      }

      if (current.scrollTop) {
        setIsScrollingY(true);
      }
    };

    current.addEventListener("scroll", scrollHandler);

    return () => current.removeEventListener("scroll", scrollHandler);
  }, [ref]);

  useEffect(() => {
    if (x === debouncedX) {
      setIsScrollingX(false);
    }
  }, [x, debouncedX]);

  useEffect(() => {
    if (y === debouncedY) {
      setIsScrollingY(false);
    }
  }, [y, debouncedY]);

  return { x, y, isScrollingX, isScrollingY };
};

export default useIsScrolling;
