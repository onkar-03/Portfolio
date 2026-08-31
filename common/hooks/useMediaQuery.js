'use client';
import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook.
 * Returns false on the server and on first paint, then syncs after mount
 * so markup stays deterministic between server and client.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True only for devices with a real hover-capable pointer (mouse/trackpad). */
export function useHasHover() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** Matches the SCSS `$mobile` breakpoint. Keep in sync with the modules. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}
