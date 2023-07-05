import { FlatNamespace } from 'i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18nextConfig from '../../next-i18next.config'

/**
 * The default namespaces for translations.
 */
export const defaultNamespaces: Array<FlatNamespace> = ['common']

/**
 * Retrieves namespaces based on the provided requirements.
 * Note: The namespace from {@link defaultNamespaces} will always be added.
 * @param namespacesRequired The namespaces required.
 * @returns The retrieved namespaces.
 */
export const getNamespaces = (
  namespacesRequired: Readonly<FlatNamespace> | ReadonlyArray<FlatNamespace> | undefined = undefined
) => {
  // default with namespaces to always needed
  const namespaces: Array<FlatNamespace> = defaultNamespaces

  if (!namespacesRequired) {
    return namespaces
  }

  if (typeof namespacesRequired === 'string') {
    return [...new Set([...namespaces, namespacesRequired])]
  }

  return [...new Set([...namespaces, ...namespacesRequired])]
}

/**
 * A wrapper function for server-side translations using next-i18next.
 * @param locale - The locale to use for translations. If not provided, the default locale specified in `nextI18nextConfig` will be used.
 * @param namespacesRequired - The namespaces required for translations. It can be a single `FlatNamespace` or an array of `FlatNamespace`. If not provided, {@link defaultNamespaces} will be used.
 * @returns {Promise<object>} - A Promise that resolves to an object containing the translations for the specified locale and namespaces.
 */
export const pageWithServerSideTranslations = async (
  locale?: string,
  namespacesRequired: FlatNamespace | Array<FlatNamespace> | undefined = undefined
) => {
  return serverSideTranslations(
    locale ?? nextI18nextConfig.i18n.defaultLocale,
    getNamespaces(namespacesRequired),
    nextI18nextConfig
  )
}
