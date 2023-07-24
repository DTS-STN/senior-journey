/* eslint-disable @next/next/no-img-element */
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

const NextImageMock = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  return <img {...{ alt: '', ...props }} />
}

export default NextImageMock
