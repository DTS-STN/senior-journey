import { FC } from "react"
import Image from "next/image"

export interface SupportingSeniorsCardProps {
    src: string,
    href: string,
    linkText: string,
    text: string
}

const SupportingSeniorsCard: FC<SupportingSeniorsCardProps> = ({src, href, linkText, text}) => {
  return (
    <div className="flex flex-col border rounded-md shadow-lg p-4">
        
        <div className="h-[300px] mx-auto">
            <Image 
                src={src}
                width={200}
                height={300}
                alt=""
            />
        </div>
        <a href={href} target='_blank'>{linkText}</a>
        <p>{text}</p>
    </div>
  )
}

export default SupportingSeniorsCard