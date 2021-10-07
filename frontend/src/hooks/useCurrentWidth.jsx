import { useCallback, useEffect, useState } from "react";

export const useCurrentWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(
    document.documentElement.clientWidth
  );

  const eventResize = useCallback(() => {
    setCurrentWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", eventResize);

    return () => {
      window.removeEventListener("resize", eventResize);
    };
  }, [eventResize]);

  return { currentWidth };
};
