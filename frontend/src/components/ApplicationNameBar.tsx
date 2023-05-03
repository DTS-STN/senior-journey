import { FC } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

export interface ApplicationNameBarProps {
  text: string
  href: string
  checklist: string
  checklistUrl: string
  breadcrumbItems?: BreadcrumbItem[]
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({ text, href, checklist, checklistUrl, breadcrumbItems }) => {
  let router = useRouter()

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    let encodedFilters = localStorage.getItem('quiz')
    router.push(encodedFilters === null ? `/${router.locale}/learn` : `/quiz/tasks/${encodedFilters}`)
  }

  return (
    <div id="app-bar">
      <section className="container mx-auto p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <MuiLink
            component={Link}
            href={href}
            color="primary"
            className="font-display text-2xl font-bold"
            underline="hover"
          >
            <h2>{text}</h2>
          </MuiLink>
          {router.pathname !== '/quiz/tasks/[[...filters]]' && (
            <Button
              component={Link}
              href={checklistUrl}
              startIcon={<BookmarkBorderIcon />}
              size="large"
              onClick={handleClick}
              disabled={!router.isReady}
            >
              {checklist}
            </Button>
          )}
        </div>
        <Breadcrumb items={breadcrumbItems} />
      </section>
    </div>
  )
}

export default ApplicationNameBar
