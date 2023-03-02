import { FC } from 'react'

import Image from 'next/image'

import DateModified from './DateModified'

export interface FooterLogo {
  src: string
  alt: string
  width: number
  height: number
}

export interface FooterLink {
  link: string
  linkText: string
}

export interface FooterProps {
  dateModifiedText: string

  /**
   * footer header
   */
  footerHeader: string

  /**
   * footer canada-ca logo
   */
  footerLogo: FooterLogo

  /**
   * Screenreader section indicator
   */
  footerNavHeader: string

  /**
   * array of objects containing the link text and link
   */
  links: FooterLink[]
}

/**
 * footer element for all pages
 */
const Footer: FC<FooterProps> = ({
  dateModifiedText,
  footerHeader,
  footerLogo,
  footerNavHeader,
  links,
}: FooterProps) => {
  return (
    <footer>
      <h2 className="sr-only">{footerHeader}</h2>
      <DateModified text={dateModifiedText} />
      <div className="bg-gray-light pt-6 pb-8">
        <div className="container mx-auto px-4">
          <div role="navigation" aria-labelledby="footerNav">
            <h3 className="sr-only" id="footerNav">
              {footerNavHeader}
            </h3>
            <div className="flex justify-between items-end md:items-center">
              <ul className="list-none md:list-disc md:list-inside flex flex-wrap flex-col space-y-3 md:space-y-0 md:flex-row md:items-center marker:text-xs">
                {links.map(({ link, linkText }) => (
                  <li key={link} className="first:list-none md:mr-4">
                    <a
                      className="font-body text-sm text-[#21303F] hover:text-[#5E8EBD]"
                      data-cy="social-media-link"
                      href={link}
                    >
                      {linkText}
                    </a>
                  </li>
                ))}
              </ul>
              <Image
                className="h-10 w-auto"
                alt={footerLogo.alt}
                src={footerLogo.src}
                width={footerLogo.width}
                height={footerLogo.height}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
