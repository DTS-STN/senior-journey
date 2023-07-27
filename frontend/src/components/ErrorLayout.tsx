import { PropsWithChildren } from 'react'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Image from 'next/image'

export interface ErrorLayoutProps extends PropsWithChildren {}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto my-6 px-4">
        <Image
          className="h-6 w-auto sm:h-8 md:h-8 lg:h-7 xl:h-8"
          alt="Government of Canada - Gouvernement du Canada"
          src="/assets/sig-blk-en.svg"
          width={300}
          height={28}
          priority
        />
      </header>
      <hr />
      <main role="main" id="mainContent" className="container mx-auto my-8 flex-1 px-4">
        {children}
      </main>
      <footer className="bg-gray-light py-4">
        <div className="container mx-auto flex justify-between px-4 lg:flex-row-reverse">
          <a className="w-32 font-body text-sm sm:w-36 lg:hidden" href="#">
            Top of page / Haut de la page&nbsp;
            <KeyboardArrowUpIcon />
          </a>
          <Image
            className="h-6 w-auto lg:h-auto lg:w-40"
            alt="Symbol of the Government of Canada - Symbole du gouvernement du Canada"
            src="/assets/wmms-blk.svg"
            width={300}
            height={71}
            priority
          />
        </div>
      </footer>
    </div>
  )
}

export default ErrorLayout
