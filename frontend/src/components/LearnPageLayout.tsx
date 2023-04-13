import { FC } from 'react'

import { useTableOfContentsData } from '../lib/hooks/useTableOfContentsData'
import Layout from './Layout'
import { TableOfContents } from './TableOfContents'

export interface LearnPageLayoutProps {
  children: React.ReactNode
  header: string
}

export const LearnPageLayout: FC<LearnPageLayoutProps> = ({
  children,
  header,
}) => {
  const tableOfContentsData = useTableOfContentsData()
  return (
    <Layout>
      <h1 className="mb-10 rounded-3xl bg-[#212121]/[.08] px-4 py-6 font-display text-4xl font-medium text-primary-700 md:mb-12 md:px-24 md:py-16 md:text-5xl md:font-bold">
        {header}
      </h1>
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="hidden lg:col-span-4 lg:block xl:col-span-3">
          {!tableOfContentsData.loading && (
            <TableOfContents {...tableOfContentsData} />
          )}
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9">
          {children}
        </section>
      </div>
    </Layout>
  )
}
