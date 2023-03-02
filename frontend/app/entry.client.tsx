import { StrictMode, startTransition } from 'react'

import { RemixBrowser } from '@remix-run/react'

import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend from 'i18next-http-backend'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .init({
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      defaultNS: 'common',
      detection: { order: ['path'] },
      ns: getInitialNamespaces(),
      react: { useSuspense: false },
    })

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>
    )
  })
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1)
}
