import { useTranslation } from 'react-i18next'

import { AppLink } from '~/components'

export default function Index() {
  const { t } = useTranslation()

  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <section id="hero" className="mt-10 text-center">
          <h1 className="h1 text-5xl font-bold">Index page</h1>
          <div className="mt-4 text-xl text-gray-600">
            <p>Localized message: <mark>{t('greeting')}</mark></p>
          </div>
          <div className="mt-4 text-xl text-gray-600">
            <p>
              <AppLink to="/about">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  Go to About page
                </button>
              </AppLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
