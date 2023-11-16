import { Link as MuiLink } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useChecklistUrl } from '../lib/hooks/useChecklistUrl'
import { usePublicRuntimeConfig } from '../lib/hooks/usePublicRuntimeConfig'
import { resolveHref } from '../utils/url-utils'
import ApplicationNameBar from './ApplicationNameBar'
import Banner from './Banner'
import { BreadcrumbItem } from './Breadcrumb'

export interface HeaderProps {
  gocLink: string
  skipToMainText: string
  breadcrumbItems?: BreadcrumbItem[]
  className?: string
  hideChecklist?: boolean
}

const Header = ({ gocLink, skipToMainText, breadcrumbItems, hideChecklist, className }: HeaderProps) => {
  const publicRuntimeConfig = usePublicRuntimeConfig()
  const { locale, query, pathname } = useRouter()
  const { t } = useTranslation('common')
  const checklistUrl = useChecklistUrl()

  const langSelectorLocale = locale === 'en' ? 'fr' : 'en'
  const langSelectorAbbreviation = langSelectorLocale === 'fr' ? 'FR' : 'EN'
  const langSelectorText = langSelectorLocale === 'fr' ? 'Français' : 'English'
  const showBanner = publicRuntimeConfig.ENVIRONMENT !== 'prod'

  return (
    <>
      <nav
        role="navigation"
        aria-labelledby="skipToMainContent"
        className="absolute -left-96 h-px w-px focus-within:top-4 focus-within:z-50 focus-within:flex focus-within:h-auto focus-within:w-screen focus-within:justify-center"
      >
        <a
          id="skipToMainContent"
          className="border border-blue-dark bg-blue-dark px-2 font-body font-bold text-white hover:bg-basic-darkgray focus:text-white focus:ring-2 focus:ring-inset focus:ring-orange-dark focus:ring-offset-2 "
          href="#mainContent"
          draggable="false"
        >
          {skipToMainText}
        </a>
      </nav>

      <header className={className}>
        {showBanner && <Banner alert={t('banner.alert')} description={t('banner.description')} />}
        <div className="container mx-auto flex flex-col justify-between px-4 py-2.5 md:flex md:flex-row">
          <div className="flex flex-row content-center items-center justify-between md:mt-7">
            <a href={gocLink}>
              <Image
                key={locale}
                className="h-7 w-auto lg:h-8"
                alt={locale === 'en' ? 'Government of Canada' : 'Gouvernement du Canada'}
                src={`/assets/sig-blk-${locale}.svg`}
                width={300}
                height={28}
                priority
              />
            </a>

            {/* Language selector for small screens */}
            <MuiLink
              component={Link}
              href={resolveHref({ pathname, query })}
              locale={langSelectorLocale}
              replace
              className="ml-6 block cursor-help pb-2 decoration-dotted sm:ml-16 md:hidden"
              lang={langSelectorLocale}
              color="primary"
            >
              <abbr title={langSelectorText}>{langSelectorAbbreviation}</abbr>
            </MuiLink>
          </div>

          <div className="flex flex-col">
            {/* Language selector for mid to larger screens */}
            <MuiLink
              component={Link}
              href={resolveHref({ pathname, query })}
              locale={langSelectorLocale}
              replace
              className="hidden self-end pb-0 md:block lg:pb-4"
              data-cy="toggle-language-link"
              lang={langSelectorLocale}
              color="primary"
            >
              {langSelectorText}
            </MuiLink>
          </div>
        </div>

        <ApplicationNameBar
          text={t('application-name')}
          href="/"
          checklist={t('checklist')}
          checklistUrl={checklistUrl}
          breadcrumbItems={breadcrumbItems}
          hideChecklist={hideChecklist}
        />
      </header>
    </>
  )
}

export default Header
