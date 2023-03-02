import '@testing-library/jest-dom'

import { OpenGraphMedia } from 'next-seo/lib/types'

import {
  LanguageAlternate,
  NextSEORouter,
  getLanguageAlternates,
  getNextSEOConfig,
  getOpenGraphImages,
} from '../src/next-seo.config'

describe('getNextSEOConfig', () => {
  it('should call getDefaultConfig when router.locale is empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: '' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe(
      "Avoid waiting on the phone and request the status of your application online. | Évitez d'attendre au téléphone et demandez l'état de votre demande en ligne."
    )
  })

  it('should call getEnglishConfig when router.locale is `en`', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: 'en' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe(
      'Avoid waiting on the phone and request the status of your application online.'
    )
  })

  it('should call getFrenchConfig when router.locale is `fr`', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: 'fr' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe(
      "Évitez d'attendre au téléphone et demandez l'état de votre demande en ligne."
    )
  })
})

describe('getLanguageAlternates', () => {
  it('should return undefined when appBaseUri is empty', () => {
    // arrange
    const appBaseUri = ''
    const router: NextSEORouter = { asPath: '', locale: '' }

    // act
    const act = getLanguageAlternates(appBaseUri, router)

    // assert
    expect(act).toBeUndefined()
  })

  it('should return language alternate links when appBaseUri is not empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '/home', locale: '' }

    // act
    const act = getLanguageAlternates(appBaseUri, router)

    // assert
    expect(act).not.toBeUndefined()
    expect(act).toStrictEqual([
      {
        href: 'https://example.com/en/home',
        hrefLang: 'en',
      },
      {
        href: 'https://example.com/fr/home',
        hrefLang: 'fr',
      },
    ] as ReadonlyArray<LanguageAlternate>)
  })
})

describe('getOpenGraphImages', () => {
  it('should return undefined when appBaseUri is empty', () => {
    // arrange
    const appBaseUri = ''

    // act
    const act = getOpenGraphImages(appBaseUri)

    // assert
    expect(act).toBeUndefined()
  })

  it('should return open graph images when appBaseUri is not empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'

    // act
    const act = getOpenGraphImages(appBaseUri)

    // assert
    expect(act).not.toBeUndefined()
    expect(act).toStrictEqual([
      {
        url: 'https://example.com/ogp.jpg',
        width: 2048,
        height: 1152,
      },
    ] as ReadonlyArray<OpenGraphMedia>)
  })
})
