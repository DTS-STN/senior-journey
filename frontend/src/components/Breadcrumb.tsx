import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export type BreadcrumbItemType = {
    text: string;
    link: string;
  };

export interface BreadcrumbProps {
    id?: string;
    items?: BreadcrumbItemType[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ id, items }) => {
  const { t } = useTranslation('common')
  return (
    <section className="container mx-auto">
    <nav aria-label="breadcrumbs" id={id}>
      <ul className="block text-blue-link font-body">
      <li
        key={`list-canada`}
        className={`inline-block w-100 pb-4 sm:pb-0`}
        >
          <Link
          href={t('header.goc-link')}
          className="font-body hover:text-blue-hover text-blue-link underline"
          >
          {t('goc-site')}
          </Link>
          {items && items.length > 0 && (
            <NavigateNextIcon className='mx-2' />
          )}
      </li>
        {items
          ? items.map((item, index) => {
              return (
                <li
                  key={`list-${index}`}
                  className={`inline-block w-100 pb-4 sm:pb-0`}
                >
                  <Link
                    href={item.link}
                    className="font-body hover:text-blue-hover text-blue-link underline"
                  >
                    {item.text}
                  </Link>
                  {index < items.length - 1 && (
                    <span className="mx-2 inline-block align-middle text-blue-link pr-2 pl-2">{'>'}</span>
                  )}
                </li>
              );
            })
          : null}
      </ul>
    </nav>
</section>
  )
}

export default Breadcrumb