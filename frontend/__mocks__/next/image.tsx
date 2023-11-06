/* eslint-disable @next/next/no-img-element */
interface NextImageMockProps {
  alt?: string
  height?: string | number
  src?: string
  width?: string | number
}

const NextImageMock = ({ alt, height, src, width }: NextImageMockProps) => (
  <img alt={alt} height={height} src={src} width={width} />
)

export default NextImageMock
