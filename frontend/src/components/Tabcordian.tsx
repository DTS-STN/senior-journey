import Link from "next/link"
import { FC, useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'

interface TabcordianLink {
    title: string
    url: string
    description: string
}

interface TabcordianData {
    title: string
    description: Array<string>
    linksTitle: string
    links: Array<TabcordianLink>
}

export interface TabcordianProps {
    data: Array<TabcordianData>
}

const Tabcordian: FC<TabcordianProps> = ({
    data,
  }: TabcordianProps) => {

    const [active, setActive] = useState<number | null>(null)

    function toggleTabs(i:number | null) {
        return setActive(i)
    }

    function toggleAccordion(i:number | null) {
      if (active == i) {
        return setActive(null)
      }

      setActive(i)
    }

    return (
        <div className="flex flex-col md:my-16">
            <div className="hidden md:flex md:mx-4 lg:mx-16 md:justify-between md:px-6 lg:px-14 md:space-x-4 lg:space-x-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:z-20 bg-white">
                {data.map((item, i) => (
                <button
                key={item.title}
                className={"h4 rounded-xl md:p-6 lg:p-8 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"+ ((active === i || (active === null && i === 0)) ? ' text-white bg-blue-dark' : '')}
                onClick={() => toggleTabs(i)}
                >
                {item.title}
                </button>
                ))}
            </div>
            
            <div className="px-7 py-6 md:px-12 lg:px-24 md:relative md:bg-[#f5f5f5] rounded-2xl md:-mt-6 md:py-16">
                {data.map((item, i) => (
                    <div key={item.title} >
                        <div
                            className="flex items-center py-3 rounded shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:hidden my-3 bg-white " onClick={() => toggleAccordion(i)}>
                            <div className="flex flex-grow justify-center h4">{item.title}
                            </div>
                            <div className="">
                                <MdKeyboardArrowDown fontSize={28} />
                            </div>
                        </div>
                        <div className={(active === i ? 'max-h-full' : 'max-h-0 overflow-hidden') + ((active === null && i === 0) ? ' md:max-h-full' : '')}>
                            <div className="flex">
                                <div className="flex flex-col md:flex-row  md:space-x-14 ">
                                    <div className="bg-white px-10  rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
                                        <h3 className="h1 py-5 flex items-center">
                                            {item.title} <MdKeyboardArrowRight />
                                        </h3>
                                        <div className="justify-center">
                                            {item.description.map((desc,i) => (
                                                <p key={i}>{desc}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-5 md:pt-0">
                                        <h3 className="h3">
                                            {item.linksTitle}
                                        </h3>
                                        <div className="py-2">
                                            {item.links.map((link, b) => (
                                                <div
                                                    key={link.title}
                                                    className="bg-white py-4 p-3 border-t-2 border-t-slate-300">
                                                    <div className="py-3">
                                                        <Link className="h4 text-xl no-underline" href={link.url}>{link.title}</Link>
                                                    </div>
                                                    <div>
                                                        {link.description}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tabcordian