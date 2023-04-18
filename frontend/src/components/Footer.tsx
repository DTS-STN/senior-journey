import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

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
   * Nav Header in the footer
   */
  footerNavHeader: string

  /**
   * Learning Matierials Header for appropriate menu
   */
  learningMaterialsText: string

  /**
   * array of objects containing the Learning materials link text and link
   */
  learningMaterialsLinks: FooterLink[]

  /**
   * Menu Header for appropriate menu
   */
  menuText: string
  /**
   * array of objects containing the Menu link text and link
   */
  menuLinks: FooterLink[]

  /**
   * array of objects containing the link text and link
   */
  links: FooterLink[]

  /**
   * footer top of page
   */
  footerTopOfPage: string
}

/**
 * footer element for all pages
 */
const Footer: FC<FooterProps> = ({
  dateModifiedText,
  footerHeader,
  footerLogo,
  footerNavHeader,
  learningMaterialsText,
  learningMaterialsLinks,
  menuText,
  menuLinks,
  links,
  footerTopOfPage,
}: FooterProps) => {
  return (
    <footer>
      <div className="wl-full mt-2 h-auto bg-blue-dark text-white">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-center font-bold md:text-left">{footerHeader}</h2>
          <div className="flex flex-col items-start justify-between md:flex-row md:items-start ">
            <div className="grow">
              <h2 className="h4 py-7 md:text-[22px]">
                {learningMaterialsText}
              </h2>
              <ul className="col-span-2 md:columns-2">
                {learningMaterialsLinks.map(({ link, linkText }) => (
                  <li key={link} className="py-2">
                    <Link
                      href={link}
                      className="hover:underline focus:underline"
                    >
                      {linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="h4 py-3.5 md:py-0 md:text-[22px]">{menuText}</h2>
              <ul className="py-3.5 pb-10 md:py-4 md:pb-0">
                {menuLinks.map(({ link, linkText }) => (
                  <li key={link} className="py-2">
                    <Link
                      href={link}
                      className="hover:underline focus:underline"
                    >
                      {linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h2 className="sr-only">{footerHeader}</h2>
      <div className="bg-gray-light pb-8 pt-6">
        <div className="container mx-auto px-4">
          <div role="navigation" aria-labelledby="footerNav">
            <h3 className="sr-only" id="footerNav">
              {footerNavHeader}
            </h3>
            <div className="flex items-end justify-between md:items-center">
              <ul className="hidden flex-col flex-wrap space-y-3 marker:text-xs md:list-inside md:list-disc md:flex-row md:items-center md:space-y-0 lg:flex">
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
              <Link
                className="w-32 font-body text-sm sm:w-36 md:hidden"
                href="#"
              >
                {footerTopOfPage}
                <span className="font-extrabold">&#8963;</span>
              </Link>
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
