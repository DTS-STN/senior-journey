import { FC } from 'react'

import { Link as MuiLink } from '@mui/material'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import ErrorLayout from '../ErrorLayout'

const Error404Page: FC = () => {
  return (
    <ErrorLayout>
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
          <h2 className="h2">We couldn&#39;t find that Web page</h2>
          <p className="h4">Error 404</p>
          <p>
            We&#39;re sorry you ended up here. Sometimes a page gets moved or deleted, but hopefully we can help you
            find what you&#39;re looking for. What next?
          </p>
          <ul className="list-disc space-y-1 pl-7">
            <li>
              Return to the{' '}
              <MuiLink component={Link} href="/" locale="en">
                home page
              </MuiLink>
              ;
            </li>
            <li>
              <MuiLink href="https://www.canada.ca/en/contact.html">Contact us</MuiLink> and we&#39;ll help you out.
            </li>
          </ul>
        </div>
        <div lang="fr">
          <h2 className="h2">Nous ne pouvons trouver cette page Web</h2>
          <p className="h4">Erreur 404</p>
          <p>
            Nous sommes désolés que vous ayez abouti ici. Il arrive parfois qu&#39;une page ait été déplacée ou
            supprimée. Heureusement, nous pouvons vous aider à trouver ce que vous cherchez. Que faire?
          </p>
          <ul className="list-disc space-y-1 pl-7">
            <li>
              Retournez à la{' '}
              <MuiLink component={Link} href="/" locale="fr">
                page d&#39;accueil
              </MuiLink>
              ;
            </li>
            <li>
              <MuiLink href="https://www.canada.ca/fr/contact.html">Communiquez avec nous</MuiLink> pour obtenir de
              l&#39;aide.
            </li>
          </ul>
        </div>
      </div>
    </ErrorLayout>
  )
}

export default Error404Page
