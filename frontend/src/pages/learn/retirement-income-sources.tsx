import { FC, PropsWithChildren } from 'react'

import { Divider, Link as MuiLink, Paper } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import { LearnPageLayout } from '../../components/LearnPageLayout'

export interface ImportantCardProps extends PropsWithChildren {}
const ImportantCard: FC<ImportantCardProps> = ({ children }) => (
  <p className="rounded-lg bg-[#fba575]/[.3] p-5">{children}</p>
)

const RetirementIncomeSources: FC = () => {
  const { t } = useTranslation('learn/retirement-income-sources')

  return (
    <LearnPageLayout header={t('header')}>
      <NextSeo title={t('header')} />
      <h2 id="overview" className="sr-only">
        {t('overview.header')}
      </h2>
      <p>{t('overview.paragraph-1')}</p>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('overview.list.oas-and-gis')}</li>
        <li>{t('overview.list.cpp')}</li>
        <li>{t('overview.list.earnings')}</li>
        <li>{t('overview.list.workplace')}</li>
        <li>{t('overview.list.savings-and-investments')}</li>
      </ul>
      <p>{t('overview.paragraph-2')}</p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="overview.paragraph-3.content"
          components={{ a: <MuiLink href={t('overview.paragraph-3.link')} /> }}
        />
      </p>

      <h2 id="canada-retirement-income-system" className="h2">
        {t('canada-retirement-income-system.header')}
      </h2>
      <h3 className="mb-6 bg-primary-600 p-4 font-display text-2xl font-light text-white">
        {t('canada-retirement-income-system.three-pillar-system')}
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex h-full flex-col gap-6 md:col-span-2">
          <h4 className="bg-secondary-700 p-4 font-display text-xl font-bold text-white">
            {t('canada-retirement-income-system.public')}
          </h4>
          <div className="grid h-full gap-6 md:grid-cols-2">
            <div className="h-full bg-secondary-100 p-4">
              <h5 className="mb-2.5 font-display text-xs font-semibold uppercase">
                {t('canada-retirement-income-system.pillar-1.header')}
              </h5>
              <p className="mb-2.5 font-bold">
                {t('canada-retirement-income-system.pillar-1.paragraph-1')}
              </p>
              <p className="text-sm">
                {t('canada-retirement-income-system.pillar-1.paragraph-2')}
              </p>
            </div>
            <div className="h-full bg-secondary-100 p-4">
              <h5 className="mb-2.5 font-display text-xs font-semibold uppercase">
                {t('canada-retirement-income-system.pillar-2.header')}
              </h5>
              <p className="mb-2.5 font-bold">
                {t('canada-retirement-income-system.pillar-2.paragraph-1')}
              </p>
              <p className="text-sm">
                {t('canada-retirement-income-system.pillar-2.paragraph-2')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col gap-6">
          <h4 className="bg-[#4A0056] p-4 font-display text-xl font-bold text-white">
            {t('canada-retirement-income-system.private')}
          </h4>
          <div className="h-full bg-[#F0D0FF] p-4">
            <h5 className="mb-2.5 font-display text-xs font-semibold uppercase">
              {t('canada-retirement-income-system.pillar-3.header')}
            </h5>
            <p className="mb-2.5 font-bold">
              {t('canada-retirement-income-system.pillar-3.paragraph-1')}
            </p>
            <p className="text-sm">
              {t('canada-retirement-income-system.pillar-3.paragraph-2')}
            </p>
            <p className="text-sm">
              {t('canada-retirement-income-system.pillar-3.paragraph-3')}
            </p>
          </div>
        </div>
      </div>

      <h2 id="old-age-security-program" className="h2">
        {t('old-age-security-program.header')}
      </h2>
      <p>{t('old-age-security-program.overview')}</p>

      <h3 className="h3">{t('old-age-security-program.oas-pension.header')}</h3>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="old-age-security-program.oas-pension.paragraph-1.content"
          components={{
            a: (
              <MuiLink
                href={t(
                  'old-age-security-program.oas-pension.paragraph-1.link'
                )}
              />
            ),
          }}
        />
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="old-age-security-program.oas-pension.paragraph-2.content"
          components={{
            a: (
              <MuiLink
                href={t(
                  'old-age-security-program.oas-pension.paragraph-2.link'
                )}
              />
            ),
          }}
        />
      </p>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div>
          <p>
            <Trans
              ns="learn/retirement-income-sources"
              i18nKey="old-age-security-program.oas-pension.paragraph-3.content"
              components={{
                a: (
                  <MuiLink
                    color="secondary"
                    href={t(
                      'old-age-security-program.oas-pension.paragraph-3.link'
                    )}
                  />
                ),
              }}
            />
          </p>
          <p className="m-0">
            {t('old-age-security-program.oas-pension.paragraph-4')}
          </p>
        </div>
        <div>
          <Paper className="p-4 sm:w-[264px]">
            <h4 className="mb-4">
              {t('old-age-security-program.oas-pension.card.header')}
            </h4>
            <p className="mb-4.5 text-xs">
              {t('old-age-security-program.oas-pension.card.content')}
            </p>
            <div className="text-right">
              <MuiLink href="#" className="uppercase" color="primary">
                {t('old-age-security-program.oas-pension.card.learn-more')}
              </MuiLink>
            </div>
          </Paper>
        </div>
      </div>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="old-age-security-program.oas-pension.paragraph-5.content"
          components={{
            a1: (
              <MuiLink
                href={t(
                  'old-age-security-program.oas-pension.paragraph-5.link-1'
                )}
              />
            ),
            a2: (
              <MuiLink
                href={t(
                  'old-age-security-program.oas-pension.paragraph-5.link-2'
                )}
              />
            ),
          }}
        />
      </p>

      <h3 className="h3">
        {t('old-age-security-program.guaranteed-income-supplement.header')}
      </h3>
      <p>
        {t('old-age-security-program.guaranteed-income-supplement.paragraph-1')}
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>
          {t(
            'old-age-security-program.guaranteed-income-supplement.list.live-canada'
          )}
        </li>
        <li>
          {t(
            'old-age-security-program.guaranteed-income-supplement.list.receive-pension'
          )}
        </li>
        <li>
          <Trans
            ns="learn/retirement-income-sources"
            i18nKey="old-age-security-program.guaranteed-income-supplement.list.income-below-maximum.content"
            components={{
              a: (
                <MuiLink
                  href={t(
                    'old-age-security-program.guaranteed-income-supplement.list.income-below-maximum.link'
                  )}
                />
              ),
            }}
          />
        </li>
      </ul>
      <p>
        {t('old-age-security-program.guaranteed-income-supplement.paragraph-2')}
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="old-age-security-program.guaranteed-income-supplement.paragraph-3.content"
          components={{
            a: (
              <MuiLink
                href={t(
                  'old-age-security-program.guaranteed-income-supplement.paragraph-3.link'
                )}
              />
            ),
          }}
        />
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="old-age-security-program.guaranteed-income-supplement.paragraph-4.content"
          components={{
            a: (
              <MuiLink
                href={t(
                  'old-age-security-program.guaranteed-income-supplement.paragraph-4.link'
                )}
              />
            ),
          }}
        />
      </p>

      <h2 id="canada-pension-plan-program" className="h2">
        {t('canada-pension-plan-program.header')}
      </h2>
      <p>{t('canada-pension-plan-program.overview.paragraph-1')}</p>
      <p>{t('canada-pension-plan-program.overview.paragraph-2')}</p>

      <h3 className="h3">
        {t('canada-pension-plan-program.cpp-retirement-pension.header')}
      </h3>
      <p>
        {t('canada-pension-plan-program.cpp-retirement-pension.paragraph-1')}
      </p>
      <p>
        {t('canada-pension-plan-program.cpp-retirement-pension.paragraph-2')}
      </p>
      <p>
        {t('canada-pension-plan-program.cpp-retirement-pension.paragraph-3')}
      </p>
      <p>
        {t('canada-pension-plan-program.cpp-retirement-pension.paragraph-4')}
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="canada-pension-plan-program.cpp-retirement-pension.paragraph-5.content"
          components={{
            a: (
              <MuiLink
                href={t(
                  'canada-pension-plan-program.cpp-retirement-pension.paragraph-5.link'
                )}
              />
            ),
          }}
        />
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="canada-pension-plan-program.cpp-retirement-pension.paragraph-6"
          components={{
            Link: (
              <MuiLink component={Link} href="/learn/cpp-retirement-pension" />
            ),
          }}
        />
      </p>

      <h3 className="h3">
        {t('canada-pension-plan-program.cpp-post-retirement-benefit.header')}
      </h3>
      <p>
        {t(
          'canada-pension-plan-program.cpp-post-retirement-benefit.paragraph-1'
        )}
      </p>
      <p>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="canada-pension-plan-program.cpp-post-retirement-benefit.paragraph-2"
          components={{
            Link: <MuiLink component={Link} href="/learn/cpp-pension" />,
          }}
        />
      </p>
      <ImportantCard>
        <Trans
          ns="learn/retirement-income-sources"
          i18nKey="canada-pension-plan-program.cpp-post-retirement-benefit.important-notice"
        />
      </ImportantCard>

      <h2 id="ongoing-earnings-from-your-job" className="h2">
        {t('ongoing-earnings-from-your-job.header')}
      </h2>
      <p>{t('ongoing-earnings-from-your-job.overview')}</p>
      <Paper className="mb-4 p-4">
        <h3 className="mb-4 font-display font-medium">
          {t('ongoing-earnings-from-your-job.card.header')}
        </h3>
        <p className="mb-4.5 text-sm">
          {t('ongoing-earnings-from-your-job.card.content')}
        </p>
        <div className="text-right">
          <MuiLink href="#" className="uppercase" color="primary">
            {t('ongoing-earnings-from-your-job.card.learn-more')}
          </MuiLink>
        </div>
      </Paper>

      <h2 id="workplace-pension-plans" className="h2">
        {t('workplace-pension-plans.header')}
      </h2>
      <p>{t('workplace-pension-plans.overview')}</p>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('workplace-pension-plans.list.rpp')}</li>
        <li>{t('workplace-pension-plans.list.group-rrsp')}</li>
        <li>{t('workplace-pension-plans.list.group-tfsa')}</li>
        <li>{t('workplace-pension-plans.list.prpp')}</li>
      </ul>

      <h2 id="personal-retirement-savings" className="h2">
        {t('personal-retirement-savings.header')}
      </h2>
      <p>{t('personal-retirement-savings.overview')}</p>

      <h3 className="h3">{t('personal-retirement-savings.rrsp.header')}</h3>
      <p>{t('personal-retirement-savings.rrsp.overview')}</p>
      <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-10">
        <Image
          alt={t('personal-retirement-savings.rrsp.illustration.alt')}
          src={t('personal-retirement-savings.rrsp.illustration.img-url')}
          width={173}
          height={150}
          className="w-full max-w-md"
        />
        <ImportantCard>
          <Trans
            ns="learn/retirement-income-sources"
            i18nKey="personal-retirement-savings.rrsp.important-notice"
          />
        </ImportantCard>
      </div>

      <h3 className="h3">{t('personal-retirement-savings.tfsa.header')}</h3>
      <p>{t('personal-retirement-savings.tfsa.overview')}</p>
      <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-10">
        <Image
          alt={t('personal-retirement-savings.tfsa.illustration.alt')}
          src={t('personal-retirement-savings.tfsa.illustration.img-url')}
          width={173}
          height={150}
          className="w-full max-w-md"
        />
        <ImportantCard>
          <Trans
            ns="learn/retirement-income-sources"
            i18nKey="personal-retirement-savings.tfsa.important-notice"
          />
        </ImportantCard>
      </div>

      <h2 className="h2">{t('learn-more.header')}</h2>
      {[
        {
          header: t('learn-more.transitioning-from-work-to-retirement.header'),
          description: t(
            'learn-more.transitioning-from-work-to-retirement.description'
          ),
          link: '/learn/transitioning-from-work-to-retirement',
        },
        {
          header: t('learn-more.canada-pension-plan-program.header'),
          description: t('learn-more.canada-pension-plan-program.description'),
          link: '/learn/canada-pension-plan-program',
        },
        {
          header: t('learn-more.old-age-security-program.header'),
          description: t('learn-more.old-age-security-program.description'),
          link: '/learn/old-age-security-program',
        },
        {
          header: t('learn-more.sources-of-retirement-income.header'),
          description: t('learn-more.sources-of-retirement-income.description'),
          link: '/learn/retirement-income-sources',
        },
      ].map(({ header, description, link }) => (
        <Link
          key={header}
          href={link}
          className="mt-10 block text-basic-gray no-underline visited:text-basic-gray hover:text-basic-gray focus:text-basic-gray"
        >
          <div className="mb-3 flex items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-medium">{header}</h3>
              <p className="m-0 text-sm text-opacity-60">{description}</p>
            </div>
            <div className="text-primary-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <Divider />
        </Link>
      ))}
    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'learn/retirement-income-sources',
    ])),
  },
})

export default RetirementIncomeSources
