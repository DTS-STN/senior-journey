import { FC, PropsWithChildren } from 'react'

import Image, { ImageProps } from 'next/image'

export interface HeroBannerProps extends PropsWithChildren {
  imageProps: ImageProps
}

export const HeroBanner: FC<HeroBannerProps> = ({ children, imageProps }) => {
  return (
    <section className="overflow-hidden rounded-3xl bg-gray-surface">
      <div className="grid md:min-h-[300px] md:grid-cols-12 md:items-center">
        <div className="flex h-full flex-col md:order-last md:col-span-6 md:flex-row lg:col-span-4">
          <Image
            alt=""
            className="hidden h-full w-auto md:block"
            height={151}
            priority
            src="/assets/left.svg"
            width={17}
          />
          <div className="relative h-[260px] md:h-full md:flex-grow">
            <Image
              alt=""
              className="absolute z-30 hidden h-full w-auto md:block"
              height={151}
              priority
              src="/assets/right.svg"
              width={17}
            />
            <Image
              {...{
                ...imageProps,
                alt: imageProps.alt ?? '',
                className: `h-full w-full object-cover ${imageProps.className ?? ''}`,
                priority: imageProps.priority ?? true,
              }}
            />
            <Image
              alt=""
              className="absolute bottom-0 h-auto w-full md:hidden"
              height={17}
              priority
              src="/assets/bottom-top.svg"
              width={180}
            />
          </div>
          <Image
            alt=""
            className="h-auto w-full md:hidden"
            height={17}
            priority
            src="/assets/bottom-bottom.svg"
            width={180}
          />
        </div>
        <div className="m-6 mt-12 md:col-span-6 md:m-8 lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}
