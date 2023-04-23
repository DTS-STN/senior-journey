import { FC, PropsWithChildren } from 'react'

import { Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import {
  LearnPageLayout
} from '../../components/LearnPageLayout'

export interface ImportantCardProps extends PropsWithChildren { }
const ImportantCard: FC<ImportantCardProps> = ({ children }) => (
  <p className="rounded-lg bg-[#ffe8a3]/[.3] p-5">{children}</p>
)

export interface DisclaimerCardProps extends PropsWithChildren { }
const DisclaimerCard: FC<ImportantCardProps> = ({ children }) => (
  <p className="rounded-lg bg-[#e9f1ff]/[.7] p-5">{children}</p>
)

const RuleOfThumbPublicPensions: FC = () => {
  const { t } = useTranslation('learn/rule-of-thumb-public-pensions')

  return (
    <LearnPageLayout
      header={t('header')}
      learnMoreHeader={t('learn-more-heading')}
      learnMoreLinks={[]}
    >
      <NextSeo title={t('header')} />
      <h2 id="key-takeaways" className="h2 !mt-0">
        {t('key-takeaways.heading')}
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list-one.item-1')}</li>
        <li>{t('key-takeaways.list-one.item-2')}</li>
        <li>{t('key-takeaways.list-one.item-3')}</li>
        <li>{t('key-takeaways.list-one.item-4')}</li>
      </ul>
      <p>{t('key-takeaways.content-one')}</p>      
      <ImportantCard>
        <Trans
          ns="learn/rule-of-thumb-public-pensions"
          i18nKey="key-takeaways.smart-tip"
        />
      </ImportantCard>
      <p>{t('key-takeaways.content-two')}</p>
      <p>{t('key-takeaways.content-three')}</p>
      <p>{t('key-takeaways.content-four')}</p>
      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-one')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list-two.item-1')}</li>
        <li>{t('key-takeaways.list-two.item-2')}</li>
        <li>{t('key-takeaways.list-two.item-3')}</li>
        <li>{t('key-takeaways.list-two.item-4')}</li>
        <li>{t('key-takeaways.list-two.item-5')}</li>
        <li>{t('key-takeaways.list-two.item-6')}</li>
        <li>{t('key-takeaways.list-two.item-7')}</li>
        <li>{t('key-takeaways.list-two.item-8')}</li>
      </ul>
      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-two')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list-three.item-1')}</li>
        <li>{t('key-takeaways.list-three.item-2')}</li>
        <li>{t('key-takeaways.list-three.item-3')}</li>
        <li>{t('key-takeaways.list-three.item-4')}</li>
        <li>{t('key-takeaways.list-three.item-5')}</li>
        <li>{t('key-takeaways.list-three.item-6')}</li>
        <li>{t('key-takeaways.list-three.item-7')}</li>
      </ul>

      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-three')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list-four.item-1')}</li>
        <li>{t('key-takeaways.list-four.item-2')}</li>
        <li>{t('key-takeaways.list-four.item-3')}</li>
        <li>{t('key-takeaways.list-four.item-4')}</li>
        <li>{t('key-takeaways.list-four.item-5')}</li>
        <li>{t('key-takeaways.list-four.item-6')}</li>
        <li>{t('key-takeaways.list-four.item-7')}</li>
        <li>{t('key-takeaways.list-four.item-8')}</li>
      </ul>
      <p>{t('key-takeaways.content-five')}</p>
      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-four')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li><Trans
            ns="learn/rule-of-thumb-public-pensions"
            i18nKey="key-takeaways.list-five.item-1.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.list-five.item-1.link')} />),
            }}
          /></li>
        <li>{t('key-takeaways.list-five.item-2')}</li>
        <li>{t('key-takeaways.list-five.item-3')}</li>
        <li>{t('key-takeaways.list-five.item-4')}</li>
      </ul>
      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-five')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list-six.item-1')}</li>
        <li><Trans
            ns="learn/rule-of-thumb-public-pensions"
            i18nKey="key-takeaways.list-six.item-2.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.list-six.item-1.link')} />),
            }}
          /></li>
        <li>{t('key-takeaways.list-six.item-3')}</li>
        <li>{t('key-takeaways.list-six.item-4')}</li>
      </ul>
      <h3 id="key-takeaways" className="h3 !mt-0">
        {t('key-takeaways.sub-heading-six')}
      </h3>
      <ul className="mb-5 list-disc space-y-2 pl-7">        
        <li><Trans
            ns="learn/rule-of-thumb-public-pensions"
            i18nKey="key-takeaways.list-seven.item-1.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.list-seven.item-1.link')} />),
            }}
          /></li>
          <li>{t('key-takeaways.list-seven.item-2')}</li>
        <li>{t('key-takeaways.list-seven.item-3')}</li>
      </ul>

      <DisclaimerCard>
        <Trans
          ns="learn/rule-of-thumb-public-pensions"
          i18nKey="key-takeaways.disclaimer"
        />
      </DisclaimerCard>
    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn/rule-of-thumb-public-pensions',
      ])),
    },
  }
}

export default RuleOfThumbPublicPensions
