import { FC } from 'react'

import { ArrowDropUp } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { TableOfContentItem } from '../lib/types'
import Collapse from './Collapse'

export interface TableOfContentsCollapseProps {
  items: ReadonlyArray<TableOfContentItem>
}

export const TableOfContentsCollapse: FC<TableOfContentsCollapseProps> = ({ items }) => {
  const { t } = useTranslation('common')

  return (
    <Collapse title={t('table-of-contents.header')}>
      <Divider />
      <nav aria-label={t('table-of-contents.aria-label')}>
        {items.length > 0 && (
          <List>
            {items.map(({ hash, text }) => (
              <ListItem key={hash} disablePadding>
                <ListItemButton component="a" href={`#${hash}`}>
                  <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
                  history.pushState({}, document.title, ' ')
                }}
              >
                <ArrowDropUp color="primary" />
                <ListItemText primary={t('table-of-contents.top')} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </nav>
    </Collapse>
  )
}
