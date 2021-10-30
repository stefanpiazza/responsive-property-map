import { useEffect, useState } from "react";

const useOnScreen = (
  ref,
  { threshold = 0, root = null, rootMargin = "0%" }
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, observerParams);

    if (ref.current) {
      ref.current.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);
  return entry;
};

export default useOnScreen;
