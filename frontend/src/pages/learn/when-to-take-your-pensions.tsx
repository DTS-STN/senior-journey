import { FC } from 'react'

import { Paper } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import AccessibilityGraphContainer from '../../components/AccessibilityGraphContainer'
import { TableData } from '../../components/AccessibilityTable'
import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'

const WhenToTakeYourPensions: FC = () => {
  const { t } = useTranslation('learn/when-to-take-your-pensions')

  const illustrationOASGraphData: TableData = t('old-age-security.illustration.accessibility', { returnObjects: true })
  const illustrationCPPGraphData: TableData = t('cpp-pension.illustration.accessibility', { returnObjects: true })
  const illustrationCaseStudyData1: TableData = t('case-study.illustration-one.accessibility', { returnObjects: true })
  const illustrationCaseStudyData2: TableData = t('case-study.illustration-two.accessibility', { returnObjects: true })
  const illustrationCaseStudyData3: TableData = t('case-study.illustration-three.accessibility', {
    returnObjects: true,
  })
  const illustrationCaseStudyData4: TableData = t('case-study.illustration-four.accessibility', { returnObjects: true })
  const illustrationCaseStudyData5: TableData = t('case-study.illustration-five.accessibility', { returnObjects: true })

  return (
    <LearnPageLayout
      header={t('header')}
      learnMoreHeader={t('learn-more-heading')}
      learnMoreLinks={[]}
      breadcrumbItems={[
        {
          link: t('breadcrumbs.home.link'),
          text: t('breadcrumbs.home.text'),
        },
        {
          link: t('breadcrumbs.learn.link'),
          text: t('breadcrumbs.learn.text'),
        },
      ]}
    >
      <NextSeo title={t('header')} />

      <h2 id="key-takeaways" className="h2 !mt-0">
        {t('key-takeaways.heading')}
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list.public-pensions')}</li>
        <li>{t('key-takeaways.list.you-can-claim')}</li>
        <li>{t('key-takeaways.list.to-make-a-wise')}</li>
        <li>{t('key-takeaways.list.consider-using')}</li>
      </ul>
      <p>{t('key-takeaways.content-one')}</p>

      <h2 id="old-age-security" className="h2">
        {t('old-age-security.heading')}
      </h2>
      <p>{t('old-age-security.content-one')}</p>

      <h3 className="h3">{t('old-age-security.table-one.title')}</h3>

      <Paper variant="outlined" className="mb-6">
        <table className="min-w-full border-collapse divide-y text-left">
          <thead className="bg-gray-surface">
            <tr className="divide-x">
              <th scope="col" className="px-3 py-2.5">
                {t('old-age-security.table-one.header-one')}
              </th>
              <th scope="col" className="px-3 py-2.5">
                {t('old-age-security.table-one.header-two')}
              </th>
              <th scope="col" className="px-3 py-2.5">
                {t('old-age-security.table-one.header-two')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              {
                col1: t('old-age-security.table-one.row-one.column-one-value'),
                col2: t('old-age-security.table-one.row-one.column-two-value'),
                col3: t('old-age-security.table-one.row-one.column-three-value'),
              },
              {
                col1: t('old-age-security.table-one.row-two.column-one-value'),
                col2: t('old-age-security.table-one.row-two.column-two-value'),
                col3: t('old-age-security.table-one.row-two.column-three-value'),
              },
            ].map((row) => (
              <tr key={row.col1} className="divide-x">
                <td className="px-3 py-2.5">{row.col1}</td>
                <td className="px-3 py-2.5">{row.col2}</td>
                <td className="px-3 py-2.5">{row.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
      <AlertCard type="important" className="mb-8">
        <Trans
          ns="learn/when-to-take-your-pensions"
          i18nKey="old-age-security.smart-tip.content"
          components={{
            a1: <a className="underline" href={t('old-age-security.smart-tip.link-one')} />,
            a2: <a className="underline" href={t('old-age-security.smart-tip.link-two')} />,
          }}
        />
      </AlertCard>
      <p>{t('old-age-security.content-two')}</p>
      <Image
        alt={t('old-age-security.illustration.alt')}
        src={t('old-age-security.illustration.img-url')}
        width={842}
        height={519}
        className="w-full"
      />
      <AccessibilityGraphContainer
        tableData={illustrationOASGraphData}
        description={t('old-age-security.illustration.description')}
      />
      <p>{t('old-age-security.content-three')}</p>
      <p>{t('old-age-security.content-four')}</p>
      <p>
        <Trans
          ns="learn/when-to-take-your-pensions"
          i18nKey="old-age-security.content-five.content"
          components={{
            a1: <a className="underline" href={t('old-age-security.content-five.link-one')} />,
          }}
        />
      </p>
      <p>{t('old-age-security.content-six')}</p>
      <p>
        <Trans
          ns="learn/when-to-take-your-pensions"
          i18nKey="old-age-security.content-seven.content"
          components={{
            a1: <a className="underline" href={t('old-age-security.content-seven.link-one')} />,
          }}
        />
      </p>

      <h2 id="cpp-pension" className="h2">
        {t('cpp-pension.heading')}
      </h2>
      <p>{t('cpp-pension.content-one')}</p>
      <AlertCard type="important">
        <Trans ns="learn/when-to-take-your-pensions" i18nKey="cpp-pension.smart-tip" />
      </AlertCard>
      <div>
        <Image
          alt={t('cpp-pension.illustration.alt')}
          src={t('cpp-pension.illustration.img-url')}
          width={551}
          height={361}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCPPGraphData}
          description={t('cpp-pension.illustration.description')}
        />
      </div>
      <p>{t('cpp-pension.content-two')}</p>
      <p>
        <Trans
          ns="learn/when-to-take-your-pensions"
          i18nKey="cpp-pension.content-three.content"
          components={{
            a1: <a className="underline" href={t('cpp-pension.content-three.link-one')} />,
          }}
        />
      </p>
      <p>{t('cpp-pension.content-four')}</p>

      <Paper variant="outlined" className="mb-6">
        <table className="min-w-full border-collapse divide-y text-left">
          <thead className="bg-gray-surface">
            <tr className="divide-x">
              <th scope="col" className="px-3 py-2.5">
                {t('cpp-pension.cpp-income-table.header-column-one-value')}
              </th>
              <th scope="col" className="px-3 py-2.5">
                {t('cpp-pension.cpp-income-table.header-column-two-value')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              {
                id: t('cpp-pension.cpp-income-table.row-one.id'),
                col1: t('cpp-pension.cpp-income-table.row-one.column-one-value'),
                col2: t('cpp-pension.cpp-income-table.row-one.column-two-value'),
              },
              {
                id: t('cpp-pension.cpp-income-table.row-two.id'),
                col1: t('cpp-pension.cpp-income-table.row-two.column-one-value'),
                col2: t('cpp-pension.cpp-income-table.row-two.column-two-value'),
              },
              {
                id: t('cpp-pension.cpp-income-table.row-three.id'),
                col1: t('cpp-pension.cpp-income-table.row-three.column-one-value'),
                col2: t('cpp-pension.cpp-income-table.row-three.column-two-value'),
              },
              {
                id: t('cpp-pension.cpp-income-table.row-four.id'),
                col1: t('cpp-pension.cpp-income-table.row-four.column-one-value'),
                col2: t('cpp-pension.cpp-income-table.row-four.column-two-value'),
              },
              {
                id: t('cpp-pension.cpp-income-table.row-five.id'),
                col1: t('cpp-pension.cpp-income-table.row-five.column-one-value'),
                col2: t('cpp-pension.cpp-income-table.row-five.column-two-value'),
              },
            ].map((row) => (
              <tr key={row.id} className="divide-x">
                <td className="px-3 py-2.5">{row.col1}</td>
                <td className="px-3 py-2.5">{row.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
      <p>{t('cpp-pension.content-five')}</p>
      <AlertCard type="disclaimer">
        <Trans ns="learn/when-to-take-your-pensions" i18nKey="cpp-pension.disclaimer" />
      </AlertCard>

      <h2 id="case-study" className="h2">
        {t('case-study.heading')}
      </h2>
      <h3 id="case-study-sub-heading" className="h3">
        {t('case-study.sub-heading')}
      </h3>
      <p>{t('case-study.content-one')}</p>
      <p>{t('case-study.content-two')}</p>
      <p>{t('case-study.content-three')}</p>
      <h4 id="case-study-illustration-one-title" className="h4">
        {t('case-study.illustration-one.title')}
      </h4>
      <div>
        <Image
          alt={t('case-study.illustration-one.alt')}
          src={t('case-study.illustration-one.img-url')}
          width={839}
          height={558}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCaseStudyData1}
          description={t('case-study.illustration-one.description')}
        />
      </div>
      <p>{t('case-study.content-four')}</p>
      <AlertCard type="important">
        <Trans ns="learn/when-to-take-your-pensions" i18nKey="case-study.smart-tip" />
      </AlertCard>
      <div>
        <Image
          alt={t('case-study.illustration-two.alt')}
          src={t('case-study.illustration-two.img-url')}
          width={839}
          height={450}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCaseStudyData2}
          description={t('case-study.illustration-two.description')}
        />
      </div>
      <p>{t('case-study.content-five')}</p>
      <p>{t('case-study.content-six')}</p>
      <h4 id="case-study-illustration-three-title" className="h4">
        {t('case-study.illustration-three.title')}
      </h4>
      <div>
        <Image
          alt={t('case-study.illustration-three.alt')}
          src={t('case-study.illustration-three.img-url')}
          width={839}
          height={450}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCaseStudyData3}
          description={t('case-study.illustration-three.description')}
        />
      </div>
      <p>{t('case-study.content-seven')}</p>
      <div>
        <Image
          alt={t('case-study.illustration-four.alt')}
          src={t('case-study.illustration-four.img-url')}
          width={839}
          height={450}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCaseStudyData4}
          description={t('case-study.illustration-four.description')}
        />
      </div>
      <p>{t('case-study.content-eight')}</p>
      <div>
        <Image
          alt={t('case-study.illustration-five.alt')}
          src={t('case-study.illustration-five.img-url')}
          width={839}
          height={450}
          className="w-full"
        />
        <AccessibilityGraphContainer
          tableData={illustrationCaseStudyData5}
          description={t('case-study.illustration-five.description')}
        />
      </div>
      <p>{t('case-study.content-nine')}</p>
      <p>{t('case-study.content-ten')}</p>
    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/when-to-take-your-pensions'])),
    },
  }
}

export default WhenToTakeYourPensions
