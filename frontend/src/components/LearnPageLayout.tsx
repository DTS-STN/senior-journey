import { FC } from 'react'

import Layout from './Layout'

export interface LearnPageLayoutProps {
  children: React.ReactNode
  header: string
  nav: React.ReactNode
}

export const LearnPageLayout: FC<LearnPageLayoutProps> = ({
  children,
  header,
  nav,
}) => {
  return (
    <Layout>
      <h1 className="mb-10 rounded-3xl bg-[#212121]/[.08] px-4 py-6 font-display text-4xl font-medium text-primary-700 md:mb-12 md:px-24 md:py-16 md:text-5xl md:font-bold">
        {header}
      </h1>
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="hidden lg:col-span-4 lg:block xl:col-span-3">
          {nav}
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9">
          {children}
        </section>
      </div>
    </Layout>
  )
}
