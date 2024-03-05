'use client'

import { Card, CardContent, CardHeader } from '@mui/material'

import { useTranslation } from 'react-i18next'

import {
  PeopleOutline,
  MapOutlined,
  LocationOnOutlined,
  TranslateOutlined,
  PhoneOutlined,
  PhoneAndroidOutlined,
  EmailOutlined
} from '@mui/icons-material'

import { List } from './list'
import { useUsrDetailsQuery, useCommonCountry, useCommonLang } from '@/hooks/api-erp'

export function CardAbout() {
  const { t } = useTranslation()
  const { data } = useUsrDetailsQuery()
  const langQuery = useCommonLang()
  const countryQuery = useCommonCountry()

  if (langQuery.isPending) {
    return null
  }

  if (countryQuery.isPending) {
    return null
  }

  if (langQuery.isError) {
    return langQuery.error.message
  }

  if (countryQuery.isError) {
    return countryQuery.error.message
  }

  const country_list = countryQuery.data.country_list
  const country = country_list.find(item => item.id === data?.country_id)
  const countryText = country?.name

  const lang_list = langQuery.data.lang_list
  const lang = lang_list.find(item => item.code === data?.lang)
  const langText = lang?.name

  return (
    <Card>
      <CardHeader title={t('User')} subheader={t('About you')} />
      <CardContent>
        <List>
          <List.Item icon={<PeopleOutline></PeopleOutline>} label='full name'>
            {data?.full_name}
          </List.Item>
          <List.Item icon={<MapOutlined></MapOutlined>} label='city'>
            {data?.city}
          </List.Item>
          <List.Item icon={<LocationOnOutlined></LocationOnOutlined>} label='country'>
            {countryText}
          </List.Item>
          <List.Item icon={<TranslateOutlined></TranslateOutlined>} label='language'>
            {langText}
          </List.Item>
          <List.Item icon={<PhoneOutlined></PhoneOutlined>} label='phone'>
            {data?.phone}
          </List.Item>
          <List.Item icon={<PhoneAndroidOutlined></PhoneAndroidOutlined>} label='mobile'>
            {data?.mobile}
          </List.Item>
          <List.Item icon={<EmailOutlined></EmailOutlined>} label='email'>
            {data?.email}
          </List.Item>
        </List>
      </CardContent>
    </Card>
  )
}
