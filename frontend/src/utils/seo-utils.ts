import { MetaTag } from 'next-seo/lib/types'

export type GetDCTermsTitle = (content: string) => MetaTag

export const getDCTermsTitle: GetDCTermsTitle = (content) => ({ name: 'dcterms.title', content })
