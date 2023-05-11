import { Button, Link as MuiLink, Paper } from '@mui/material'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import { getDCTermsTitle } from '../utils/seo-utils'

const Index = () => {
  return (
    <>
      <NextSeo
        noindex
        title="Retirement Hub | Retirement Hub (FR)"
        titleTemplate="%s - Canada.ca"
        additionalMetaTags={[getDCTermsTitle('Retirement Hub', 'Retirement Hub (FR)')]}
      />
      <main role="main" className="flex h-screen bg-splash-page bg-cover bg-center">
        <Paper square elevation={0} className="m-auto w-[300px] md:w-[400px] lg:w-[500px]">
          <div className="p-8">
            <h1 className="sr-only">Retirement Hub | Retirement Hub (FR)</h1>
            <div className="w-11/12 lg:w-8/12">
              <Image
                className="mb-1.5"
                property="logo"
                alt="Government of Canada"
                src="/assets/sig-blk-en.svg"
                width={300}
                height={28}
                priority
              />
              <span className="sr-only">
                {' '}
                / <span lang="fr">Gouvernement du Canada</span>
              </span>
            </div>
            <div className="mb-2 mt-9 flex justify-center gap-8">
              <section className="w-36" lang="en">
                <h2 className="sr-only">Government of Canada</h2>
                <Button
                  color="secondary"
                  component={Link}
                  fullWidth
                  href="/"
                  id="english-button"
                  locale="en"
                  disableElevation={false}
                  size="large"
                >
                  English
                </Button>
              </section>
              <section className="w-36" lang="fr">
                <h2 className="sr-only">Gouvernement du Canada</h2>
                <Button
                  color="secondary"
                  component={Link}
                  fullWidth
                  href="/"
                  id="french-button"
                  locale="fr"
                  disableElevation={false}
                  size="large"
                >
                  Français
                </Button>
              </section>
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 bg-gray-surface p-8">
            <div className="w-7/12 md:w-8/12">
              <MuiLink
                data-cy="terms"
                href="https://www.canada.ca/en/transparency/terms.html"
                lang="en"
                underline="hover"
              >
                Terms &amp; conditions
              </MuiLink>
              <span className="text-gray-400"> • </span>
              <MuiLink
                data-cy="avis"
                href="https://www.canada.ca/fr/transparence/avis.html"
                lang="fr"
                underline="hover"
              >
                Avis
              </MuiLink>
            </div>
            <div className="w-5/12 md:w-4/12">
              <Image
                alt="Symbol of the Government of Canada"
                src="/assets/wmms-blk.svg"
                width={300}
                height={71}
                priority
              />
              <span className="sr-only">
                {' '}
                / <span lang="fr">Symbole du gouvernement du Canada</span>
              </span>
            </div>
          </div>
        </Paper>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})

export default Index
