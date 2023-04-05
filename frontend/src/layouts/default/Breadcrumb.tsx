import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'

type BreadcrumbItemType = {
    text: string;
    link: string;
  };

const Breadcrumb: FC = () => {

  const { t } = useTranslation('common')
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbItemType> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      linkPath.pop();
      const pathArray = linkPath.map((path, i) => {
        const formattedPath = path.charAt(0).toUpperCase() + path.slice(1)
        .split("-")
        .join(" ");
        return {
          text: formattedPath,
          link: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  } 

  return (
    <section className="container mx-auto pt-1">
    <nav aria-label="breadcrumbs">
      <ul className="block text-blue-link font-body">
      <li
        key={`list-canada`}
        className={`inline-block w-100 pb-4 sm:pb-0`}
        >
          <Link
          href={t('header.goc-link')}
          className="font-body hover:text-blue-hover text-blue-link underline"
          >
          Canada.ca
          </Link>
          {breadcrumbs.length > 0 && (
            <span className="mx-2 inline-block align-middle text-blue-link pr-2 pl-2">{'>'}</span>
          )}
      </li>
        {breadcrumbs
          && breadcrumbs.map((item, index) => {
              return (
                <li
                  key={`list-${index}`}
                  className={`inline-block w-100 pb-4 sm:pb-0`}
                >
                  <Link
                    href={item.link}
                    className="font-body hover:text-blue-hover text-blue-link underline"
                  >
                    {item.text}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2 inline-block align-middle text-blue-link pr-2 pl-2">{'>'}</span>
                  )}
                </li>
              );
            })
            }
      </ul>
    </nav>
</section>
  )
}

export default Breadcrumb
