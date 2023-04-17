import { FC } from 'react'

import { Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { TableOfContentItem } from '../lib/types'
import Collapse from './Collapse'

export interface TableOfContentsCollapseProps {
  items: ReadonlyArray<TableOfContentItem>
}

export const TableOfContentsCollapse: FC<TableOfContentsCollapseProps> = ({
  items,
}) => {
  const { t } = useTranslation('common')

  return (
    <Collapse title={t('table-of-contents.header')}>
      <Divider />
      <nav aria-label={t('table-of-contents.aria-label')}>
        {items.length > 0 && (
          <ul>
            {items.map(({ hash, text }) => (
              <li key={hash} className="text-black/60">
                <a
                  className={`block px-4 py-3 font-display text-sm font-medium text-inherit no-underline visited:text-inherit hover:bg-[#4ED8E8]/[.12] hover:text-primary-700 hover:text-opacity-100 focus:bg-[#4ED8E8]/[.12] focus:text-primary-700`}
                  href={`#${hash}`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </Collapse>
  )
}
