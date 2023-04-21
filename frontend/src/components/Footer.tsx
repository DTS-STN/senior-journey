import { FC } from 'react'

import { Link as MuiLink } from '@mui/material'
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
      <div className="bg-blue-dark text-white">
        <div className="container mx-auto px-4 py-8 md:pb-20">
          <h2 className="mb-8 font-display text-xl font-bold">
            {footerHeader}
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-3">
              <h2 className="mb-4 font-display font-medium">
                {learningMaterialsText}
              </h2>
              <ul className="col-span-2 space-y-2 md:columns-2">
                {learningMaterialsLinks.map(({ link, linkText }) => (
                  <li key={link} className="text-sm">
                    <MuiLink
                      component={Link}
                      color="inherit"
                      underline="hover"
                      href={link}
                    >
                      {linkText}
                    </MuiLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-display font-medium">{menuText}</h2>
              <ul className="space-y-2">
                {menuLinks.map(({ link, linkText }) => (
                  <li key={link} className="text-sm">
                    <MuiLink
                      component={Link}
                      color="inherit"
                      underline="hover"
                      href={link}
                    >
                      {linkText}
                    </MuiLink>
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
                    <MuiLink
                      color="primary"
                      underline="hover"
                      className="text-sm"
                      data-cy="social-media-link"
                      href={link}
                    >
                      {linkText}
                    </MuiLink>
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
