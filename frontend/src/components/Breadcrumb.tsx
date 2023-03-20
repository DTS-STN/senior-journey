import { FC } from 'react'
import Link from 'next/link'

type BreadcrumbItemType = {
    text: string;
    link: string;
  };

export interface BreadcrumbProps {
    id?: string;
    items?: BreadcrumbItemType[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ id, items }) => {
  return (
    <section className="container mx-auto p-4">
    <nav aria-label="breadcrumbs" id={id}>
      <ul className="block text-blue-link font-body">
        {items
          ? items.map((item, index) => {
              return (
                <li
                  key={`list-${index}`}
                  className={`inline-block w-100 pb-4 sm:pb-0`}
                >
                  <Link
                    href={item.link}
                    className="font-body hover:text-canada-footer-hover-font-blue text-blue-link underline"
                  >
                    {item.text}
                  </Link>
                  {index < items.length - 1 && (
                    <span className="mx-2 inline-block align-middle text-blue-link pr-2 pl-2">{'>'}</span>
                  )}
                </li>
              );
            })
          : null}
      </ul>
    </nav>
</section>
  )
}

export default Breadcrumb
