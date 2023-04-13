import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { TableOfContentItem } from '../../components/TableOfContents'

interface TableOfContentsData {
  header?: string
  items: ReadonlyArray<TableOfContentItem>
  loading: boolean
}

export const useTableOfContentsData = (): TableOfContentsData => {
  const { t } = useTranslation()
  const [data, setData] = useState<TableOfContentsData>({
    header: undefined,
    items: [],
    loading: true,
  })

  useEffect(() => {
    setData({
      header: document.querySelector('main h1')?.textContent ?? undefined,
      items: Array.from(document.querySelectorAll('main h2[id]'))
        .filter((el) => el.id && el.textContent)
        .map((el) => ({ hash: el.id, text: el.textContent as string })),
      loading: false,
    })
  }, [t])

  return data
}
