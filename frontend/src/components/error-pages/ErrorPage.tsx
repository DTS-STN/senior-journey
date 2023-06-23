import { FC } from 'react'

import { Link as MuiLink } from '@mui/material'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import ErrorLayout from '../ErrorLayout'

export interface ErrorPageProps {
  statusCode?: number
}

const ErrorPage: FC<ErrorPageProps> = ({ statusCode }) => {
  return (
    <ErrorLayout>
      <NextSeo
        description="Error message stating that the server is down, or the URL is incorrect or expired | Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré."
        title={
          statusCode === 500
            ? 'Internal Server Error | Erreur de serveur interne'
            : 'Service Unavailable | Service indisponible'
        }
        titleTemplate="%s - Canada.ca"
      />
      <h1 className="sr-only" lang="en">
        {statusCode === 500 ? 'Internal Server Error' : 'Service Unavailable'}
      </h1>
      <span className="sr-only">
        {' '}
        / <span lang="fr">{statusCode === 500 ? 'Erreur de serveur interne' : 'Service indisponible'}</span>
      </span>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div lang="en">
          <h2 className="h2">We&#39;re having a problem with that page</h2>
          <p className="h4">{statusCode ? `Error ${statusCode}` : 'An error occurred on client'}</p>
          <p>
            We expect the problem to be fixed shortly. It&#39;s not your computer or Internet connection but a problem
            with our website&#39;s server. What next?
          </p>
          <ul className="mb-5 list-disc space-y-1 pl-7">
            <li>Try refreshing the page or try again later;</li>
            <li>
              Return to the{' '}
              <MuiLink component={Link} href="/" locale="default">
                home page
              </MuiLink>
              ;
            </li>
            <li>
              <MuiLink href="https://www.canada.ca/en/contact.html">Contact us</MuiLink>
              &nbsp;and we&#39;ll help you out
            </li>
          </ul>
          <p>Thank you for your patience.</p>
        </div>
        <div lang="fr">
          <h2 className="h2">Nous éprouvons des difficultés avec cette page</h2>
          <p className="h4">{statusCode ? `Erreur ${statusCode}` : 'Erreur produite sur le client'}</p>
          <p>
            Nous espérons résoudre le problème sous peu. Il ne s&#39;agit pas d&#39;un problème avec votre ordinateur ou
            Internet, mais plutôt avec le serveur de notre site Web. Que faire?
          </p>
          <ul className="mb-5 list-disc space-y-1 pl-7">
            <li>Actualisez la page ou réessayez plus tard;</li>
            <li>
              Retournez à la{' '}
              <MuiLink component={Link} href="/" locale="default">
                page d&#39;accueil
              </MuiLink>
              ;
            </li>
            <li>
              <MuiLink href="https://www.canada.ca/fr/contact.html">Communiquez avec nous</MuiLink> pour obtenir de
              l&#39;aide.
            </li>
          </ul>
          <p>Merci de votre patience.</p>
        </div>
      </div>
    </ErrorLayout>
  )
}

export default ErrorPage
