import { MetaTag } from 'next-seo/lib/types'

export type GetDCTermsTitle = (contentEn: string, contentFr: string) => MetaTag

export const getDCTermsTitle: GetDCTermsTitle = (contentEn, contentFr) => ({
  name: 'dcterms.title',
  content: `${contentEn} - ${contentFr}`,
})
