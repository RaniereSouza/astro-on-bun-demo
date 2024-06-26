declare global {
  interface Window {
    shared?: Record<string, unknown>
  }
}

//>>> The ThemeSwitcher component first renders and executes everything on the server side...       <<<//
//>>> Since the component calls this module, it would also try to execute any expression in here... <<<//
//>>> The next line would throw an error because of the client:idle in the ThemeSwitcher component! <<<//
// window.shared = {};

export function getShared(key: string) {
  if (!window.shared) window.shared = {};
  return window.shared[key];
}

export function setShared(key: string, value: unknown) {
  if (!window.shared) window.shared = {};
  return window.shared[key] = value;
}
