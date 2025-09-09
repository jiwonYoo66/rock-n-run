import { useCallback, useEffect, useState } from "react";

export const useWindowSize = () => {
  const isClient = typeof window === "object";

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => setWindowSize(getSize());
    handleResize(); // 초기값 세팅

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return windowSize;
  // Browser Window width size
  // export const useWindowSize = () => {
  //   const isClient = typeof window === "object" ? window : false;

  //   const getSize = useCallback(
  //     () => ({
  //       width: isClient ? window.innerWidth : 0,
  //       height: isClient ? window.innerHeight : 0,
  //     }),
  //     [isClient]
  //   );

  //   const [windowSize, setWindowSize] = useState(getSize());

  //   useEffect(() => {
  //     if (!isClient) return;
  //     const handleResize = () => setWindowSize(getSize());
  //     window.addEventListener("resize", handleResize);

  //     return () => window.removeEventListener("resize", handleResize);
  //   }, [isClient]);

  //   return windowSize;
};
