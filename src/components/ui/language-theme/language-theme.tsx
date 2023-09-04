import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../../../services'
import { SelectDemo } from '../select'

export const LanguageTheme = () => {
  const { i18n } = useTranslation()
  const language = useAppSelector(state => state.languageSlice.value)

  const languageOptions = [
    { id: 1, value: 'en' },
    { id: 2, value: 'ru' },
  ]

  const setLanguageApp = async (value: any) => {
    await i18n.changeLanguage(value)
  }

  return (
    <SelectDemo options={languageOptions} onValueChange={setLanguageApp} defaultValue={language} />
  )
}
