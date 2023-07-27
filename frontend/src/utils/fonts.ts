import { Noto_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--noto-sans-font',
  weight: ['400', '700'],
})

export const lato = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/assets/fonts/LatoLatin-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../../public/assets/fonts/LatoLatin-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/assets/fonts/LatoLatin-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/assets/fonts/LatoLatin-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--lato-font',
})
