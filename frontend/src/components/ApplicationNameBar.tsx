import { FC, useEffect, useState } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import { compact, isEmpty } from 'lodash'
import Link from 'next/link'

import { useQuizData } from '../lib/hooks/useQuizData'
import { ChecklistFilters } from '../pages/checklist/[filters]'
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
  const { data: quizData } = useQuizData()

  useEffect(() => {
    if (isEmpty(quizData)) {
      setChecklistUrl('/learn')
      return
    }

    // Encodes a js object as a url-safe base64 string.
    const checklistFilters: ChecklistFilters = { answers: compact(Object.values<string>(quizData)), tags: [] }
    const encodedChecklistFilters = encodeURIComponent(window.btoa(JSON.stringify(checklistFilters)))
    setChecklistUrl(`/checklist/${encodedChecklistFilters}`)
  }, [quizData])

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
