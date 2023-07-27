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
    /* Webfont: LatoLatin-Light */
    {
      path: '../../public/assets/fonts/LatoLatin-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    /* Webfont: LatoLatin-LightItalic */
    {
      path: '../../public/assets/fonts/LatoLatin-LightItalic.woff2',
      style: 'italic',
      weight: '300',
    },
    /* Webfont: LatoLatin-Regular */
    {
      path: '../../public/assets/fonts/LatoLatin-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    /* Webfont: LatoLatin-Italic */
    {
      path: '../../public/assets/fonts/LatoLatin-Italic.woff2',
      style: 'italic',
      weight: '400',
    },
    /* Webfont: LatoLatin-Medium */
    {
      path: '../../public/assets/fonts/LatoLatin-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    /* Webfont: LatoLatin-MediumItalic */
    {
      path: '../../public/assets/fonts/LatoLatin-MediumItalic.woff2',
      style: 'italic',
      weight: '500',
    },
    /* Webfont: LatoLatin-Semibold */
    {
      path: '../../public/assets/fonts/LatoLatin-Semibold.woff2',
      style: 'normal',
      weight: '600',
    },
    /* Webfont: LatoLatin-SemiboldItalic */
    {
      path: '../../public/assets/fonts/LatoLatin-SemiboldItalic.woff2',
      style: 'italic',
      weight: '600',
    },
    /* Webfont: LatoLatin-Bold */
    {
      path: '../../public/assets/fonts/LatoLatin-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
    /* Webfont: LatoLatin-BoldItalic */
    {
      path: '../../public/assets/fonts/LatoLatin-BoldItalic.woff2',
      style: 'italic',
      weight: '700',
    },
    /* Webfont: LatoLatin-Heavy */
    {
      path: '../../public/assets/fonts/LatoLatin-Heavy.woff2',
      style: 'normal',
      weight: '800',
    },
    /* Webfont: LatoLatin-HeavyItalic */
    {
      path: '../../public/assets/fonts/LatoLatin-HeavyItalic.woff2',
      style: 'italic',
      weight: '800',
    },
  ],
  variable: '--lato-font',
})
