import { FC, useEffect, useState } from 'react'

import { Link as MuiLink } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type BreadcrumbItemType = {
  text: string
  link: string
}

const Breadcrumb: FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] =
    useState<Array<BreadcrumbItemType> | null>(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()

      linkPath.pop()
      const pathArray = linkPath.map((path, i) => {
        const formattedPath =
          path.charAt(0).toUpperCase() + path.slice(1).split('-').join(' ')
        return {
          text: formattedPath,
          link: '/' + linkPath.slice(0, i + 1).join('/'),
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <section className="container mx-auto pt-1">
      <nav aria-label="breadcrumbs">
        <ul className="block font-body text-blue-link">
          <li key={`list-canada`} className={`w-100 inline-block pb-4 sm:pb-0`}>
            <MuiLink component={Link} href={t('header.goc-link')}>
              Canada.ca
            </MuiLink>
            {breadcrumbs.length > 0 && (
              <span className="mx-2 inline-block pl-2 pr-2 align-middle text-blue-link">
                {'>'}
              </span>
            )}
          </li>
          {breadcrumbs.map((item, index) => {
            return (
              <li
                key={`list-${index}`}
                className={`w-100 inline-block pb-4 sm:pb-0`}
              >
                <MuiLink component={Link} href={item.link}>
                  {item.text}
                </MuiLink>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2 inline-block pl-2 pr-2 align-middle text-blue-link">
                    {'>'}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </section>
  )
}

export default Breadcrumb
