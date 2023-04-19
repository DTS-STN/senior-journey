import { FC, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'

interface TabcordianLink {
  title: string
  url: string
  description: string
}

interface TabcordianData {
  title: string
  description: Array<string>
  link: string
  linksTitle: string
  links: Array<TabcordianLink>
}

export interface TabcordianProps {
  data: Array<TabcordianData>
}

const Tabcordian: FC<TabcordianProps> = ({ data }: TabcordianProps) => {
  const [active, setActive] = useState<number | null>(null)

  function toggleTabs(i: number | null) {
    return setActive(i)
  }

  function toggleAccordion(i: number | null) {
    if (active == i) {
      return setActive(null)
    }

    setActive(i)
  }

  return (
    <div className="flex flex-col md:my-16">
      <div className="z-20 hidden justify-between rounded-2xl bg-white elevation-4 md:mx-4 md:flex md:space-x-4 md:px-6 lg:mx-16 lg:space-x-6 lg:px-14">
        {data.map((item, i) => (
          <button
            key={item.title}
            className={
              'h4 box-border flex cursor-pointer appearance-none items-center justify-between rounded-xl focus:outline-none md:p-6 lg:p-8' +
              ((active ?? 0) === i ? ' bg-blue-dark text-white' : '')
            }
            onClick={() => toggleTabs(i)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="rounded-2xl px-7 py-6 md:relative md:-mt-6 md:bg-[#f5f5f5] md:px-12 md:py-16 lg:px-24">
        {data.map((item, i) => (
          <div key={item.title}>
            <div
              className="my-3 flex cursor-pointer items-center justify-between gap-1 rounded bg-white px-4 py-3 elevation-2 active:elevation-8 md:hidden"
              onClick={() => toggleAccordion(i)}
            >
              <div>{item.title}</div>
              <KeyboardArrowDownIcon />
            </div>
            <div
              className={
                (active === i ? 'max-h-full' : 'max-h-0 overflow-hidden') +
                (active === null && i === 0 ? ' md:max-h-full' : '')
              }
            >
              <div className="flex">
                <div className="flex flex-col md:flex-row md:space-x-14">
                  <div className="rounded bg-white px-10 elevation-1">
                    <h3 className="h1 my-5">
                      <MuiLink
                        component={Link}
                        href={item.link}
                        underline="hover"
                        className="inline-flex items-center"
                      >
                        <span>{item.title}</span>
                        <KeyboardArrowRightIcon fontSize="large" />
                      </MuiLink>
                    </h3>
                    <div className="justify-center">
                      {item.description.map((desc, i) => (
                        <p key={i}>{desc}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 md:pt-0">
                    <h3 className="h3">{item.linksTitle}</h3>
                    <div className="py-2">
                      {item.links.map((link, b) => (
                        <div
                          key={link.title}
                          className="border-t-2 border-t-slate-300 bg-white p-3 py-4"
                        >
                          <div className="py-3">
                            <MuiLink
                              component={Link}
                              className="text-xl font-bold"
                              href={link.url}
                              underline="hover"
                            >
                              {link.title}
                            </MuiLink>
                          </div>
                          <div>{link.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabcordian
