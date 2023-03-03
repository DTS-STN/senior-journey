import React, { FC } from 'react'

import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ApplicationNameBar from './ApplicationNameBar'
import Banner from './Banner'

export interface HeaderProps {
  gocLink: string
  skipToMainText: string
}

const Header: FC<HeaderProps> = ({ gocLink, skipToMainText }) => {
  const config = getConfig()
  const { locale, asPath } = useRouter()
  const { t } = useTranslation('common')

  const langSelectorLocale = locale === 'en' ? 'fr' : 'en'
  const langSelectorAbbreviation = langSelectorLocale === 'fr' ? 'FR' : 'EN'
  const langSelectorText = langSelectorLocale === 'fr' ? 'Français' : 'English'
  const showBanner = config?.publicRuntimeConfig?.environment !== 'prod'

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

      <header>
        {showBanner && (
          <Banner
            alert={t('banner.alert')}
            description={t('banner.description')}
          />
        )}
        <div className="container mx-auto flex flex-col justify-between px-4 py-2.5 md:flex md:flex-row">
          <div className="flex flex-row content-center items-center justify-between md:mt-7">
            <a href={gocLink}>
              <Image
                key={locale}
                className="h-7 w-auto lg:h-8"
                alt={
                  locale === 'en'
                    ? 'Government of Canada'
                    : 'Gouvernement du Canada'
                }
                src={locale === 'en' ? '/assets/sig-blk-en.svg' : '/assets/sig-blk-fr.svg'}
                width={300}
                height={28}
                priority
              />
            </a>

            {/* Language selector for small screens */}
            <Link
              href={asPath}
              locale={langSelectorLocale}
              replace
              className={`ml-6 block cursor-help pb-2 font-body text-base font-bold text-[#284162] underline decoration-dotted hover:text-[#0535d2] sm:ml-16 md:hidden md:text-sm`}
              lang={langSelectorLocale}
            >
              <abbr title={langSelectorText}>{langSelectorAbbreviation}</abbr>
            </Link>
          </div>

          <div className="flex flex-col">
            {/* Language selector for mid to larger screens */}
            <Link
              href={asPath}
              locale={langSelectorLocale}
              replace
              className="hidden self-end pb-0 font-body text-[#284162] underline hover:text-[#0535d2] md:block lg:pb-4"
              data-cy="toggle-language-link"
              lang={langSelectorLocale}
            >
              {langSelectorText}
            </Link>
            {/* Placeholder for SearchBar in case is back in ver 4??? */}
            {/* <SearchBar /> */}
          </div>
        </div>

        <ApplicationNameBar text={t('application-name-bar')} href="/" />

        {/* <Menu
          loginText={t('login')}
          items={[
            {
              link: '/search',
              text: t('service-and-benefits'),
            },
            {
              link: '/',
              text: t('tools'),
            },
            {
              link: '/',
              text: t('contact-us'),
            },
          ]}
        /> */}

        {/* Place Holder for the breadcrumbs

        <div className="layout-container my-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        */}
      </header>
    </>
  )
}

export default Header
