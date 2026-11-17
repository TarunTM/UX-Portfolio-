import { useSyncExternalStore } from 'react';

// Bridge to the sword-pull intro (public/preloader/sword-intro.js), which runs
// before React. The app tells the intro when it has rendered, and anything that
// animates on first view can wait until the intro has revealed the page.

interface SwordIntroState {
  active: boolean;
  revealed: boolean;
  started?: boolean;
}

declare global {
  interface Window {
    __swordIntro?: SwordIntroState;
    __appReady?: boolean;
  }
}

const REVEAL_EVENT = 'sword-intro:reveal';

export function signalAppReady() {
  window.__appReady = true;
  window.dispatchEvent(new Event('app:ready'));
}

function isIntroRevealed() {
  const intro = window.__swordIntro;
  return !intro || !intro.active || intro.revealed;
}

function subscribe(onChange: () => void) {
  window.addEventListener(REVEAL_EVENT, onChange);
  return () => window.removeEventListener(REVEAL_EVENT, onChange);
}

/** True once the page is visible: immediately when no intro is playing. */
export function useIntroRevealed() {
  return useSyncExternalStore(subscribe, isIntroRevealed, () => true);
}
