import { FC, useEffect, useState } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import { compact } from 'lodash'
import Link from 'next/link'

import { Filters } from '../pages/quiz/tasks/[[...filters]]'
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
  let [checklistUrl, setChecklistUrl] = useState('/learn')

  useEffect(() => {
    // try to get stored quiz form values
    try {
      const storedFormValues = JSON.parse(localStorage.getItem('quiz') ?? '')
      const filters: Filters = { answers: compact(Object.values<string>(storedFormValues)) }
      // Encodes a js object as a url-safe base64 string.
      const encodedFilters = encodeURIComponent(window.btoa(JSON.stringify(filters)))
      setChecklistUrl(`/quiz/tasks/${encodedFilters}`)
    } catch (err) {
      return
    }
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
