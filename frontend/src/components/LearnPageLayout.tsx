import React, { FC } from 'react'

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

import { useTableOfContentsData } from '../lib/hooks/useTableOfContentsData'
import Layout from './Layout'
import { TableOfContents } from './TableOfContents'
import { TableOfContentsDialog } from './TableOfContentsDialog'

export interface LearnMoreLink {
  href: string
  primary: string
  secondary?: string
}

export interface LearnPageLayoutProps {
  children: React.ReactNode
  header: string
  learnMoreHeader: string
  learnMoreLinks: ReadonlyArray<LearnMoreLink>
}

export const LearnPageLayout: FC<LearnPageLayoutProps> = ({
  children,
  header,
  learnMoreHeader,
  learnMoreLinks,
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
        <section className="sticky top-4 z-10 text-right lg:hidden ">
          {!tableOfContentsData.loading && (
            <TableOfContentsDialog {...tableOfContentsData} />
          )}
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9">
          {children}
          {learnMoreLinks.length > 0 && (
            <>
              <h2 className="h2">{learnMoreHeader}</h2>
              <List disablePadding>
                {learnMoreLinks.map(({ href, primary, secondary }) => (
                  <React.Fragment key={primary}>
                    <ListItem disablePadding>
                      <ListItemButton href={href} component={Link}>
                        <ListItemText
                          primary={primary}
                          primaryTypographyProps={{
                            variant: 'subtitle1',
                            className: 'font-display font-medium',
                            component: 'h3',
                          }}
                          secondary={secondary}
                        />
                        <MdArrowForwardIos className="text-[2rem] font-bold  xl:text-2xl" />
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </section>
      </div>
    </Layout>
  )
}
