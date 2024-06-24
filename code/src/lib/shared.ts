declare global {
  interface Window {
    shared: Record<string, unknown>
  }
}

window.shared = {};

export function getShared(key: string) {
  return window.shared[key];
}

export function setShared(key: string, value: unknown) {
  return window.shared[key] = value;
}
