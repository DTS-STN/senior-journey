import { FC, useEffect, useState } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

export interface ApplicationNameBarProps {
  text: string
  href: string
  checklist: string
  checklistUrl: string
  breadcrumbItems?: BreadcrumbItem[]
  hideChecklist?: boolean
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({ text, href, checklist, breadcrumbItems, hideChecklist }) => {
  let [checklistUrl, setChecklistUrl] = useState<string>('/learn')
  useEffect(() => {
    let quiz = localStorage.getItem('quiz')
    if (quiz === null) return
    let encodedFilters = encodeURIComponent(window.btoa(quiz ?? ''))
    setChecklistUrl(`/quiz/tasks/${encodedFilters}`)
  }, [])

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
          {!hideChecklist && (
            <Button component={Link} href={checklistUrl} startIcon={<BookmarkBorderIcon />} size="large">
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
