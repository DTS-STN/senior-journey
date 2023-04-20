import { FC } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import Breadcrumb from './Breadcrumb'

export interface ApplicationNameBarProps {
  text: string
  href: string
  checklist: string
  checklistUrl: string
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({
  text,
  href,
  checklist,
  checklistUrl,
}) => {
  return (
    <div id="app-bar">
      <section className="container mx-auto p-4">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <MuiLink
            component={Link}
            href={href}
            color="primary"
            className="font-display text-4xl font-medium"
            underline="hover"
          >
            <h2>{text}</h2>
          </MuiLink>
          <Button
            component={Link}
            href={checklistUrl}
            startIcon={<BookmarkBorderIcon />}
            size="large"
          >
            {checklist}
          </Button>
        </div>
        <Breadcrumb />
      </section>
    </div>
  )
}

export default ApplicationNameBar
