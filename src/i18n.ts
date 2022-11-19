import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nEnglish from './translations/en.json'
import i18nFrench from './translations/fr.json'

// import { fr } from 'date-fns/locale'
// import { registerLocale } from 'react-datepicker'
// registerLocale('fr', fr)

export const countries = {
    'en-US': { language: 'en', region: 'US', currency: 'USD', translation: i18nEnglish },
    'en-GB': { language: 'en', region: 'GB', currency: 'GBP', translation: i18nEnglish },
    'fr-FR': { language: 'fr', region: 'FR', currency: 'EUR', translation: i18nFrench },
} as const
export type AvailableCountryCode = keyof typeof countries
export type AvailableRegion = typeof countries[AvailableCountryCode]['region']
export type AvailableLanguage = typeof countries[AvailableCountryCode]['language']
export type AvailableCurrency = typeof countries[AvailableCountryCode]['currency']

export const defaultCountryCode: AvailableCountryCode = 'fr-FR'

export const availableCountryCodes = Object.keys(countries) as AvailableCountryCode[]
export const availableLanguages = Object.values(countries).map((country) => country.language)
export const availableRegions = Object.values(countries).map((country) => country.region)
export const availableCurrencies = Object.values(countries).map((country) => country.currency)

const translationResources: Resource = Object.values(countries).reduce(
    (acc, country) => ({ ...acc, [country.language]: { translation: country.translation } }),
    {}
)

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translationResources,
        lng: countries[defaultCountryCode].language, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n
