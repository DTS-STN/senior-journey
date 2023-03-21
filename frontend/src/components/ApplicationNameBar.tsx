import { FC } from 'react'

import Link from 'next/link'

export interface ApplicationNameBarProps {
  text: string
  href: string
  checklist: string
  checklistUrl: string
  myNotes: string
  myNotesUrl: string
}

const ApplicationNameBar: FC<ApplicationNameBarProps> = ({ text, href, checklist, checklistUrl, myNotes, myNotesUrl }) => {
  return (
    <div id="app-bar" >
      <section className="container mx-auto p-4">
        <div className='flex flex-col justify-between items-start md:items-center md:flex-row'>
          <div className='flex w-full md:columns-auto'>
            <h2 className='h4 md:text-[22px]'>
              <Link
                href={href}
                className="font-body md:text-[22px] text-lg font-bold text-black hover:underline"
                >
                {text}
              </Link>
            </h2>
          </div>
          <div
            className='flex flex-row py-6 w-full justify-between md:flex-row-reverse md:py-2 '
            >
            <div className='space-x-3 md:space-x-6'>
              <Link
              href={checklistUrl}
              className='text-white bg-blue-dark rounded-xl py-2 px-3 font-bold'
              >
              {checklist}
              </Link>
              <Link
              className='text-white bg-blue-dark rounded-xl py-2 px-3 font-bold'
              href={myNotesUrl}
              >
              {myNotes}
              </Link>
            </div>
            <div className="items-end space-y-2 md:hidden">
              <div className="w-6 h-0.5 bg-blue-dark"></div>
              <div className="w-6 h-0.5 bg-blue-dark"></div>
              <div className="w-6 h-0.5 bg-blue-dark"></div>
            </div>
          </div>
        </div>
        <div>Breadcrumb</div>
      </section>
    </div>
  )
}

export default ApplicationNameBar
