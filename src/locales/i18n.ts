// I18n Imports
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Resources Imports
import { resources } from './resources'

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  resources,
  ns: ['translation', 'common', 'button', 'label'],
  defaultNS: 'translation',
  fallbackNS: 'common',
  fallbackLng: 'en'

  // lng: "en-US",
})
