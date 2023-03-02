// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 **/
module.exports = {
  appendNamespaceToMissingKey: true,
  i18n: {
    locales: ['default', 'en', 'fr'],
    defaultLocale: 'default',
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  returnNull: false,
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
