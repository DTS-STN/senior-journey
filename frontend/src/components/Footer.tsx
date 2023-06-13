import { FC } from 'react'

import { Link as MuiLink } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export interface FooterLink {
  link: string
  linkText: string
}

export interface FooterLinksSectionProps {
  header: string
  links: FooterLink[]
}

export const FooterLinksSection: FC<FooterLinksSectionProps> = ({ header, links }) => (
  <div>
    <h3 className="mb-4 font-display font-medium md:text-xl">{header}</h3>
    <ul className="space-y-2 text-sm">
      {links.map(({ link, linkText }) => (
        <li key={link}>
          <MuiLink component={Link} color="inherit" underline="hover" href={link}>
            {linkText}
          </MuiLink>
        </li>
      ))}
    </ul>
  </div>
)

export interface FooterLogo {
  src: string
  alt: string
  width: number
  height: number
}

export interface FooterProps {
  /**
   * Contact us Header for appropriate menu
   */
  contactUsText: string

  /**
   * array of objects containing the Contact us link text and link
   */
  contactUsLinks: FooterLink[]

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
  exploreRetirementText: string

  /**
   * array of objects containing the Learning materials link text and link
   */
  exploreRetirementLinks: FooterLink[]

  /**
   * Menu Header for appropriate menu
   */
  menuText: string
  /**
   * array of objects containing the Menu link text and link
   */
  menuLinks: FooterLink[]

  /**
   * Retirement stories Header for appropriate menu
   */
  retirementStoriesText: string

  /**
   * array of objects containing the Retirement stories link text and link
   */
  retirementStoriesLinks: FooterLink[]

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
  className,
  contactUsLinks,
  contactUsText,
  exploreRetirementLinks,
  exploreRetirementText,
  footerHeader,
  footerLogo,
  footerNavHeader,
  links,
  menuLinks,
  menuText,
  retirementStoriesLinks,
  retirementStoriesText,
}: FooterProps) => {
  return (
    <footer className={className}>
      <div className="bg-blue-dark text-white">
        <div className="container mx-auto px-4 py-8">
          <h2 className="mb-8 font-display font-bold md:text-lg">{footerHeader}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <FooterLinksSection header={exploreRetirementText} links={exploreRetirementLinks} />
            <FooterLinksSection header={retirementStoriesText} links={retirementStoriesLinks} />
            <FooterLinksSection header={menuText} links={menuLinks} />
            <FooterLinksSection header={contactUsText} links={contactUsLinks} />
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
              <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {links.map(({ link, linkText }, index) => (
                  <li key={link}>
                    <div className="flex items-center">
                      {index > 0 && (
                        <span aria-hidden={true} className="mr-3 hidden sm:block">
                          •
                        </span>
                      )}
                      <MuiLink
                        color="primary"
                        underline="hover"
                        className="text-sm"
                        data-cy="social-media-link"
                        href={link}
                      >
                        {linkText}
                      </MuiLink>
                    </div>
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
