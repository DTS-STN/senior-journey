import { FC } from 'react'

import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { useLayout } from '../../layouts/LayoutProvider'

const Error404Page: FC = () => {
  useLayout('error')

  return (
    <>
      <NextSeo
        description="Error message stating that the server is down, or the URL is incorrect or expired | Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré."
        title="Not Found | Pas trouvé"
        titleTemplate="%s - Canada.ca"
      />
      <h1 className="sr-only" lang="en">
        Not Found
      </h1>
      <span className="sr-only">
        {' '}
        / <span lang="fr">Pas trouvé</span>
      </span>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div lang="en">
          <h2 className="h1">We couldn&#39;t find that Web page</h2>
          <p className="h2">Error 404</p>
          <p>
            We&#39;re sorry you ended up here. Sometimes a page gets moved or
            deleted, but hopefully we can help you find what you&#39;re looking
            for. What next?
          </p>
          <ul className="list-disc space-y-2 pl-10">
            <li>
              Return to the{' '}
              <Link href="/" locale="default">
                home page
              </Link>
              ;
            </li>
            <li>
              <a href="https://www.canada.ca/en/contact.html">Contact us</a> and
              we&#39;ll help you out.
            </li>
          </ul>
        </div>
        <div lang="fr">
          <h2 className="h1">Nous ne pouvons trouver cette page Web</h2>
          <p className="h2">Erreur 404</p>
          <p>
            Nous sommes désolés que vous ayez abouti ici. Il arrive parfois
            qu&#39;une page ait été déplacée ou supprimée. Heureusement, nous
            pouvons vous aider à trouver ce que vous cherchez. Que faire?
          </p>
          <ul className="list-disc space-y-2 pl-10">
            <li>
              Retournez à la{' '}
              <Link href="/" locale="default">
                page d&#39;accueil
              </Link>
              ;
            </li>
            <li>
              <a href="https://www.canada.ca/fr/contact.html">
                Communiquez avec nous
              </a>{' '}
              pour obtenir de l&#39;aide.
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Error404Page
