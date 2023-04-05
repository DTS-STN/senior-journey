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
      <div className='wl-full h-auto text-white bg-blue-dark mt-2'>
        <div className='container mx-auto py-8 px-4'>
          <h2 className='md:text-[16px] font-bold text-center md:text-start md:flex-row'>
            {footerHeader}
          </h2>
          
          <div className='flex flex-col justify-between items-start md:items-start md:flex-row '>
            <div className='grow'>
              <h2 className='h4 md:text-[22px] py-7'>{learningMaterialsText}</h2>
              <ul className='md:columns-2 col-span-2'>
                {learningMaterialsLinks.map(({ link, linkText }) => (
                    <li key={link} className='py-2'>
                      <Link
                      href={link}
                      >
                        {linkText}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className='h4 md:text-[22px] py-3.5 md:py-0'>{menuText}</h2>
              <ul className='py-3.5 pb-10 md:py-4 md:pb-0'>
                {menuLinks.map(({ link, linkText }) => (
                    <li key={link} className='py-2'>
                      <Link
                      href={link}
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
      <div className="bg-gray-light pt-6 pb-8">
        <div className="container mx-auto px-4">
          <div role="navigation" aria-labelledby="footerNav">
            <h3 className="sr-only" id="footerNav">
              {footerNavHeader}
            </h3>
            <div className="flex justify-between items-end md:items-center">
              <ul className="list-none hidden md:list-disc md:list-inside lg:flex flex-wrap flex-col space-y-3 md:space-y-0 md:flex-row md:items-center marker:text-xs">
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
              href='#'
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
