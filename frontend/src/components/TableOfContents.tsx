import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material'
import { DebouncedFunc, throttle } from 'lodash'
import { useTranslation } from 'next-i18next'

import { TableOfContentItem } from '../lib/types'

const noop = () => {}

const useThrottledOnScroll = (callback: any, delay?: number) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  )

  useEffect(() => {
    if (throttledCallback === noop) return
    window.addEventListener('scroll', throttledCallback)
    return () => {
      if (throttledCallback === noop) return
      window.removeEventListener('scroll', throttledCallback)
      ;(throttledCallback as DebouncedFunc<any>).cancel()
    }
  }, [throttledCallback])
}

export interface TableOfContentsProps {
  header?: string
  items: ReadonlyArray<TableOfContentItem>
}

export const TableOfContents: FC<TableOfContentsProps> = ({
  header,
  items,
}) => {
  const { t } = useTranslation('common')
  const [activeState, setActiveState] = useState<string | null>(null)

  const clickedRef = useRef(false)
  const unsetClickedRef = useRef<NodeJS.Timeout | null>(null)

  const findActiveIndex = useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return
    }

    let active
    for (let i = items.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null }
        break
      }

      const item = items[i]
      const node = document.getElementById(item.hash)

      if (process.env.NODE_ENV !== 'production') {
        if (!node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          )
        }
      }

      if (
        node &&
        node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 20
      ) {
        active = item
        break
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash)
    }
  }, [activeState, items])

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166)

  const handleClick = (hash: string) => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false
    }, 1000)

    if (activeState !== hash) {
      setActiveState(hash)
    }
  }

  useEffect(
    () => () => {
      if (unsetClickedRef.current) {
        clearTimeout(unsetClickedRef.current)
      }
    },
    []
  )

  return (
    <Paper variant="outlined" className="sticky top-2">
      <nav aria-label={t('table-of-contents.aria-label')}>
        <p className="m-0 p-4 font-display font-bold">
          {header ?? t('table-of-contents.header')}
        </p>
        <Divider />
        {items.length > 0 && (
          <List>
            {items.map(({ hash, text }) => (
              <ListItem key={hash} disablePadding>
                <ListItemButton
                  component="a"
                  href={`#${hash}`}
                  selected={activeState === hash}
                  onClick={() => handleClick(hash)}
                >
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </nav>
    </Paper>
  )
}
