import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Link as MuiLink } from '@mui/material'

export type BreadcrumbItem = {
    text: string;
    link: string;
  };

export interface BreadcrumbProps {
    id?: string;
    items?: BreadcrumbItem[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ id, items }) => {
  const { t } = useTranslation('common')
  return (
    <nav aria-label="breadcrumbs" id={id}>
    <ul className="text-sm">
      <li className="inline-block">
        <MuiLink href={t('header.goc-link')} color="primary">
          {t('goc-site')}
        </MuiLink>
        {(items?.length ?? 0) > 0 && <NavigateNextIcon className="mx-1 text-black/60" />}
      </li>
      {items?.map(({ link, text }, index) => (
        <li key={link} className="inline-block">
          <MuiLink component={Link} href={link} color="primary">
            {text}
          </MuiLink>
          {index < items.length - 1 && <NavigateNextIcon className="mx-1 text-black/60" />}
        </li>
      ))}
    </ul>
  </nav>
  )
}

export default Breadcrumb