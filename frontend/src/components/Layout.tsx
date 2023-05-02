import { FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import Container from './Container'
import Footer from './Footer'
import Header from './Header'

export interface LayoutProps {
  children: ReactNode
  contained?: boolean
}

const Layout: FC<LayoutProps> = ({ children, contained }) => {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-screen flex-col">
      <Header skipToMainText={t('header.skip-to-main')} gocLink={t('header.goc-link')} />
      <main role="main" id="mainContent" className="mt-5 flex-1 pb-8">
        {contained ? <Container>{children}</Container> : <>{children}</>}
      </main>

      <Footer
        dateModifiedText={t('footer.date-modified-text')}
        footerHeader={t('footer.header')}
        footerLogo={{
          alt: t('footer.canada-ca-alt-text'),
          src: '/assets/wmms-blk.svg',
          width: 300,
          height: 71,
        }}
        footerNavHeader={t('footer.nav-header')}
        links={[
          {
            link: t('footer.links.terms-and-condition-url'),
            linkText: t('footer.links.terms-and-condition'),
          },
          {
            link: t('footer.links.privacy-url'),
            linkText: t('footer.links.privacy'),
          },
        ]}
        learningMaterialsText={t('footer.learning-materials-text')}
        learningMaterialsLinks={[
          {
            link: t('footer.learning-materials.ri-url'),
            linkText: t('footer.learning-materials.ri'),
          },
          {
            link: t('footer.learning-materials.cpp-url'),
            linkText: t('footer.learning-materials.cpp'),
          },
          {
            link: t('footer.learning-materials.oas-url'),
            linkText: t('footer.learning-materials.oas'),
          },
          {
            link: t('footer.learning-materials.sfr-url'),
            linkText: t('footer.learning-materials.sfr'),
          },
          {
            link: t('footer.learning-materials.qual-url'),
            linkText: t('footer.learning-materials.qual'),
          },
          {
            link: t('footer.learning-materials.con-url'),
            linkText: t('footer.learning-materials.con'),
          },
          {
            link: t('footer.learning-materials.sit-url'),
            linkText: t('footer.learning-materials.sit'),
          },
          {
            link: t('footer.learning-materials.when-url'),
            linkText: t('footer.learning-materials.when'),
          },
          {
            link: t('footer.learning-materials.qualoas-url'),
            linkText: t('footer.learning-materials.qualoas'),
          },
          {
            link: t('footer.learning-materials.how-url'),
            linkText: t('footer.learning-materials.how'),
          },
        ]}
        menuText={t('footer.menu-text')}
        menuLinks={[
          {
            link: t('footer.menu.learn-url'),
            linkText: t('footer.menu.learn'),
          },
          {
            link: t('footer.menu.plan-url'),
            linkText: t('footer.menu.plan'),
          },
          {
            link: t('footer.menu.app-url'),
            linkText: t('footer.menu.app'),
          },
          {
            link: t('footer.menu.man-url'),
            linkText: t('footer.menu.man'),
          },
        ]}
        footerTopOfPage={t('footer.top-of-page')}
      />
    </div>
  )
}

Layout.defaultProps = {
  contained: true,
}

export default Layout
