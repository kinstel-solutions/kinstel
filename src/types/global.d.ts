// src/types/global.d.ts
export {} // make this a module

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
