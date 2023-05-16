import { FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import { useChecklistUrl } from '../lib/hooks/useChecklistUrl'
import { BreadcrumbItem } from './Breadcrumb'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

export interface LayoutProps {
  children: ReactNode
  breadcrumbItems?: BreadcrumbItem[]
  contained?: boolean
  hideFooter?: 'never' | 'always' | 'print'
  hideHeader?: 'never' | 'always' | 'print'
  hideChecklist?: boolean
}

const Layout: FC<LayoutProps> = ({ children, contained, breadcrumbItems, hideFooter, hideHeader, hideChecklist }) => {
  const { t } = useTranslation('common')
  const checklistUrl = useChecklistUrl()

  return (
    <div className="flex min-h-screen flex-col">
      {hideHeader !== 'always' && (
        <Header
          skipToMainText={t('header.skip-to-main')}
          gocLink={t('header.goc-link')}
          breadcrumbItems={breadcrumbItems}
          className={hideHeader == 'print' ? 'print:hidden' : undefined}
          hideChecklist={hideChecklist}
        />
      )}
      <main role="main" id="mainContent" className="mt-5 flex-1 pb-8">
        {contained ? <Container>{children}</Container> : <>{children}</>}
      </main>

      {hideFooter !== 'always' && (
        <Footer
          className={hideFooter == 'print' ? 'print:hidden' : undefined}
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
              link: '/learn/main-sources-of-retirement-income',
              linkText: t('footer.learning-materials.main-sources-of-retirement-income'),
            },
            {
              link: '/learn/planning-to-save-for-retirement',
              linkText: t('footer.learning-materials.planning-to-save-for-retirement'),
            },
            {
              link: '/learn/deciding-when-to-collect-public-pensions',
              linkText: t('footer.learning-materials.when-to-collect-public-pensions'),
            },
            {
              link: '/learn/going-from-work-to-retirement',
              linkText: t('footer.learning-materials.going-from-work-to-retirement'),
            },
            {
              link: '/learn/rules-of-thumb-for-public-pensions',
              linkText: t('footer.learning-materials.rules-of-thumb-for-public-pensions'),
            },
          ]}
          menuText={t('footer.menu-text')}
          menuLinks={[
            {
              link: '/learn',
              linkText: t('footer.menu.explore-retirement'),
            },
            {
              link: checklistUrl,
              linkText: t('footer.menu.checklist'),
            },
            {
              link: t('footer.menu.cpp-url'),
              linkText: t('footer.menu.cpp'),
            },
            {
              link: t('footer.menu.oas-url'),
              linkText: t('footer.menu.oas'),
            },
            {
              link: t('footer.menu.msca-url'),
              linkText: t('footer.menu.msca'),
            },
            {
              link: t('footer.menu.contact-us-url'),
              linkText: t('footer.menu.contact-us'),
            },
          ]}
          retirementStoriesText={t('footer.retirement-stories-text')}
          retirementStoriesLinks={[
            {
              link: '/learn/case-studies/fred',
              linkText: t('footer.retirement-stories.fred'),
            },
            {
              link: '/learn/case-studies/bonnie',
              linkText: t('footer.retirement-stories.bonnie'),
            },
            {
              link: '/learn/case-studies/keith',
              linkText: t('footer.retirement-stories.keith'),
            },
          ]}
        />
      )}
    </div>
  )
}

Layout.defaultProps = {
  contained: true,
  hideFooter: 'never',
  hideHeader: 'never',
}

export default Layout
