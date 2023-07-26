export interface BannerProps {
  alert: string
  description: string
}

const Banner = ({ alert, description }: BannerProps) => {
  return (
    <div className="bg-blue-normal font-body text-white">
      <div className="container mx-auto flex flex-col space-y-2 p-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
        <div className="w-max whitespace-nowrap border-2 border-current px-4 py-1" role="alert">
          <b>{alert}</b>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default Banner
