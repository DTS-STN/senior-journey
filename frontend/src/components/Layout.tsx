import { FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import Footer from './Footer'
import Header from './Header'

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        skipToMainText={t('header.skip-to-main')}
        gocLink={t('header.goc-link')}
      />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto mt-5 flex-1 px-4 pb-8"
      >
        {children}
      </main>

      <Footer
        dateModifiedText={t('footer.date-modified-text')}
        footerHeader={t('footer.header')}
        footerLogo={{
          alt: t('footer.canada-ca-alt-text'),
          src: '/wmms-blk.svg',
          width: 300,
          height: 71,
        }}
        footerNavHeader={t('footer.nav-header')}
        links={[
          {
            link: t('footer.links.social-media-url'),
            linkText: t('footer.links.social-media'),
          },
          {
            link: t('footer.links.mobile-applications-url'),
            linkText: t('footer.links.mobile-applications'),
          },
          {
            link: t('footer.links.about-canada-ca-url'),
            linkText: t('footer.links.about-canada-ca'),
          },
          {
            link: t('footer.links.terms-and-condition-url'),
            linkText: t('footer.links.terms-and-condition'),
          },
          {
            link: t('footer.links.privacy-url'),
            linkText: t('footer.links.privacy'),
          },
        ]}
      />
    </div>
  )
}

export default Layout
