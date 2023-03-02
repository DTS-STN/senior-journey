import { useTranslation } from 'react-i18next'

export const handle = {
  i18n: ['common', 'about']
}

export default function About() {
  const { t } = useTranslation()

  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <section id="hero" className="mt-10 text-center">
          <h1 className="h1 text-5xl font-bold">{t('about', { ns: 'about' })}</h1>
        </section>
      </div>
    </main>
  )
}
