import { Noto_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--noto-sans-font',
  weight: ['400', '700'],
})

export const lato = localFont({
  display: 'swap',
  variable: '--lato-font',
  src: [
    /* Webfont: Lato-Light */
    {
      path: '../../public/assets/fonts/Lato-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    /* Webfont: Lato-LightItalic */
    {
      path: '../../public/assets/fonts/Lato-LightItalic.woff2',
      style: 'italic',
      weight: '300',
    },
    /* Webfont: Lato-Regular */
    {
      path: '../../public/assets/fonts/Lato-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    /* Webfont: Lato-Italic */
    {
      path: '../../public/assets/fonts/Lato-Italic.woff2',
      style: 'italic',
      weight: '400',
    },
    /* Webfont: Lato-Medium */
    {
      path: '../../public/assets/fonts/Lato-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    /* Webfont: Lato-MediumItalic */
    {
      path: '../../public/assets/fonts/Lato-MediumItalic.woff2',
      style: 'italic',
      weight: '500',
    },
    /* Webfont: Lato-Semibold */
    {
      path: '../../public/assets/fonts/Lato-Semibold.woff2',
      style: 'normal',
      weight: '600',
    },
    /* Webfont: Lato-SemiboldItalic */
    {
      path: '../../public/assets/fonts/Lato-SemiboldItalic.woff2',
      style: 'italic',
      weight: '600',
    },
    /* Webfont: Lato-Bold */
    {
      path: '../../public/assets/fonts/Lato-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
    /* Webfont: Lato-BoldItalic */
    {
      path: '../../public/assets/fonts/Lato-BoldItalic.woff2',
      style: 'italic',
      weight: '700',
    },
    /* Webfont: Lato-Heavy */
    {
      path: '../../public/assets/fonts/Lato-Heavy.woff2',
      style: 'normal',
      weight: '800',
    },
    /* Webfont: Lato-HeavyItalic */
    {
      path: '../../public/assets/fonts/Lato-HeavyItalic.woff2',
      style: 'italic',
      weight: '800',
    },
  ],
})
