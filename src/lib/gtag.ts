// src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-8ZM03Y1CNK' // fallback shown

type EventParams = {
  action: string
  category?: string
  label?: string
  value?: number
}

export const pageview = (url: string) => {
  if (!globalThis.window || !globalThis.window.gtag) return
  globalThis.window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: EventParams) => {
  if (!globalThis.window || !globalThis.window.gtag) return
  globalThis.window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
