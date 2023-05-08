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
   * string of custom styles
   */
  className?: string
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
  className,
}: FooterProps) => {
  return (
    <footer className={className}>
      <div className="bg-blue-dark text-white">
        <div className="container mx-auto px-4 py-8 md:pb-20">
          <h2 className="mb-8 font-display text-xl font-bold">{footerHeader}</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-3">
              <h2 className="mb-4 font-display font-medium">{learningMaterialsText}</h2>
              <ul className="col-span-2 space-y-2 md:columns-2">
                {learningMaterialsLinks.map(({ link, linkText }) => (
                  <li key={link} className="text-sm">
                    <MuiLink component={Link} color="inherit" underline="hover" href={link}>
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
                    <MuiLink component={Link} color="inherit" underline="hover" href={link}>
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
      <div className="pb-8 pt-6">
        <div className="container mx-auto px-4">
          <div role="navigation" aria-labelledby="footerNav">
            <h3 className="sr-only" id="footerNav">
              {footerNavHeader}
            </h3>
            <div className="flex items-end justify-between sm:items-center">
              <ul className="flex flex-col gap-3 marker:text-xs sm:list-inside sm:list-disc sm:flex-row">
                {links.map(({ link, linkText }) => (
                  <li key={link} className="sm:first:list-none">
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
              <Image
                className="h-6 w-auto sm:h-10"
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
