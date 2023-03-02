import { FC } from 'react'

import Link from 'next/link'

export interface ApplicationNameBarProps {
  text: string
  href: string
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({ text, href }) => {
  return (
    <div id="app-bar" className="bg-blue-dark">
      <section className="container mx-auto p-4">
        <Link
          href={href}
          className="font-body md:text-[28px] text-lg font-bold text-white hover:underline"
        >
          {text}
        </Link>
      </section>
    </div>
  )
}

export default ApplicationNameBar
