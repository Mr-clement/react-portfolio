import {RefObject, useEffect, useRef, useState} from 'react';

export const useRevealOnVisible = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return {ref, isVisible};
};
