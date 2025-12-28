'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { GA_TRACKING_ID, pageview } from '@/lib/gtag'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  // send initial pageview + subsequent route changes
  useEffect(() => {
    if (!GA_TRACKING_ID) return
    pageview(window.location.pathname + window.location.search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  useEffect(() => {
    if (!GA_TRACKING_ID) return
    pageview(pathname)
  }, [pathname])

  if (!GA_TRACKING_ID) return null

  return (
    <>
      {/* Load gtag.js */}
      <Script
        id="gtag-js"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      {/* Initialize gtag */}
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
        `,
        }}
      />
    </>
  )
}
