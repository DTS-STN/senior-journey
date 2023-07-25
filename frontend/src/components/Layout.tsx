import { PropsWithChildren } from 'react'

import { useTranslation } from 'next-i18next'

import { useChecklistUrl } from '../lib/hooks/useChecklistUrl'
import { BreadcrumbItem } from './Breadcrumb'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

export interface LayoutProps extends PropsWithChildren {
  breadcrumbItems?: BreadcrumbItem[]
  contained?: boolean
  hideFooter?: 'never' | 'always' | 'print'
  hideHeader?: 'never' | 'always' | 'print'
  hideChecklist?: boolean
}

const Layout = ({ children, contained, breadcrumbItems, hideFooter, hideHeader, hideChecklist }: LayoutProps) => {
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
          exploreRetirementText={t('footer.explore-retirement-text')}
          exploreRetirementLinks={[
            {
              link: '/learn/main-sources-of-retirement-income',
              linkText: t('footer.explore-retirement.main-sources-of-retirement-income'),
            },
            {
              link: '/learn/planning-to-save-for-retirement',
              linkText: t('footer.explore-retirement.planning-to-save-for-retirement'),
            },
            {
              link: '/learn/deciding-when-to-start-your-public-pensions',
              linkText: t('footer.explore-retirement.when-to-start-public-pensions'),
            },
            {
              link: '/learn/going-from-work-to-retirement',
              linkText: t('footer.explore-retirement.going-from-work-to-retirement'),
            },
            {
              link: '/learn/rules-of-thumb-for-public-pensions',
              linkText: t('footer.explore-retirement.rules-of-thumb-for-public-pensions'),
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
          contactUsText={t('footer.contact-us-text')}
          contactUsLinks={[
            {
              link: t('footer.menu.general-information-by-telephone-url'),
              linkText: t('footer.menu.general-information-by-telephone'),
            },
            {
              link: t('footer.menu.find-service-canada-office-url'),
              linkText: t('footer.menu.find-service-canada-office'),
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
