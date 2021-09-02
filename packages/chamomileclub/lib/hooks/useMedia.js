import { useEffect, useRef, useState } from "react";

const useMedia = (src) => {
  const mediaRef = useRef();
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    const loaded = () => setMediaLoading(false);
    const errored = () => {
      setMediaLoading(false);
      setMediaError(true);
    }
    const bindImageAttributes = () => {
      mediaRef.current.onload = loaded
      mediaRef.current.onerror = errored
      mediaRef.current.src = src;
    }

    const bindVideoAttributes = () => {
      mediaRef.current.onloadeddata = loaded;
      mediaRef.current.onerror = errored;
      mediaRef.current.src = src;
    }

    if (!src) {
      setMediaLoading(false)
    } else {
      if (mediaRef) {
        switch (mediaRef.current.nodeName) {
          case "IMG":
            bindImageAttributes();
            break;
          case "VIDEO":
            bindVideoAttributes();
            break;
        }
      }
    };
  }, [src]);

  useEffect(() => {
    setMediaLoaded(!(mediaLoading && mediaError));
  }, [mediaLoading, mediaError]);

  return { mediaRef, mediaLoaded, mediaLoading, mediaError }
}

export default useMedia;
