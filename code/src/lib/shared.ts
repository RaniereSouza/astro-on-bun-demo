declare global {
  interface Window {
    shared?: Record<string, unknown>
  }
}

export function getShared(key: string) {
  if (!window.shared) window.shared = {};
  return window.shared[key];
}

export function setShared(key: string, value: unknown) {
  if (!window.shared) window.shared = {};
  window.shared[key] = value;
}
