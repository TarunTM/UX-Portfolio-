import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { videoSources } from '../lib/videoSources';

type LazyVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  'src' | 'autoPlay' | 'preload' | 'children'
> & {
  /** The video's .webm URL (as imported); MP4 and poster siblings are found automatically. */
  src: string;
};

/**
 * A muted, looping background video that only downloads once it is near the
 * viewport, plays while visible, pauses when scrolled away, and cancels its
 * download when the page changes. Shows the poster frame until then.
 */
export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { src, poster, muted = true, loop = true, playsInline = true, ...rest },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const visibleRef = useRef(false);
  // Without IntersectionObserver (very old browsers) just load straight away.
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined');
  const media = useMemo(() => videoSources(src), [src]);

  const setRefs = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'undefined') {
      visibleRef.current = true;
    } else {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            setNear(true);
            if (video.querySelector('source')) video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        },
        { rootMargin: '200px 0px' },
      );
      io.observe(video);
    }

    return () => {
      io?.disconnect();
      // On a real unmount the element is already detached: drop its sources so
      // the browser stops downloading. (StrictMode's test unmount keeps it attached.)
      if (!video.isConnected) {
        video.pause();
        video.querySelectorAll('source').forEach((s) => s.remove());
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [src]);

  // Sources are rendered once the video is near; start playback when they land.
  useEffect(() => {
    const video = videoRef.current;
    if (near && video && visibleRef.current) video.play().catch(() => {});
  }, [near, src]);

  return (
    <video
      key={src}
      ref={setRefs}
      poster={poster ?? media.poster}
      preload={near ? 'auto' : 'none'}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...rest}
    >
      {near && media.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </video>
  );
});

/** <source> list for a regular (non-lazy) video, e.g. in a lightbox. */
export function VideoSourceList({ src }: { src: string }) {
  const { sources } = videoSources(src);
  return (
    <>
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </>
  );
}

export default LazyVideo;
