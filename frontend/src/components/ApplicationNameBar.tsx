import { FC } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

export interface ApplicationNameBarProps {
  breadcrumbItems?: BreadcrumbItem[]
  checklist: string
  checklistUrl: string
  hideChecklist?: boolean
  href: string
  text: string
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({
  breadcrumbItems,
  checklist,
  checklistUrl,
  hideChecklist,
  href,
  text,
}) => {
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
