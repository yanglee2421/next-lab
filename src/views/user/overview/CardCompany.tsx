'use client'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardMedia, Button, Avatar } from '@mui/material'

import { useTranslation } from 'react-i18next'

import {
  LocationOnOutlined,
  TranslateOutlined,
  PhoneOutlined,
  PhoneAndroidOutlined,
  EmailOutlined,
  LocationCityOutlined,
  WebOutlined
} from '@mui/icons-material'

import { List } from './list'
import { useCompanyQuery, useCommonCountry, useCommonLang, useCommonState } from '@/hooks/api-erp'

export function CardCompany() {
  const { isSuccess, data } = useCompanyQuery()
  const langQuery = useCommonLang()
  const countryQuery = useCommonCountry()
  const stateQuery = useCommonState()
  const { t } = useTranslation()
  const params = useParams()

  if (!isSuccess) {
    return null
  }

  if (langQuery.isPending) {
    return null
  }

  if (countryQuery.isPending) {
    return null
  }

  if (stateQuery.isPending) {
    return null
  }

  if (langQuery.isError) {
    return langQuery.error.message
  }

  if (countryQuery.isError) {
    return countryQuery.error.message
  }

  if (stateQuery.isError) {
    return stateQuery.error.message
  }

  const country_list = countryQuery.data.country_list
  const country = country_list.find(item => item.id === data?.country_id)
  const countryText = country?.name

  const country_state_list = stateQuery.data.country_state_list
  const state = country_state_list.find(item => item.id === data?.state_id)
  const stateText = state?.name

  const lang_list = langQuery.data.lang_list
  const lang = lang_list.find(item => item.code === data?.lang)
  const langText = lang?.name

  return (
    <Card>
      <CardMedia sx={{ height: 168 }} image='/images/cards/workstation.png' />
      <CardHeader
        avatar={
          <Avatar
            src={data?.image_1920 ? `data:image/png;base64,${data.image_1920}` : '/images/avatars/enterprise_200.png'}
            alt='company-avatar'
          ></Avatar>
        }
        title={t('Company')}
        subheader={t('About your company')}
        action={
          <Button LinkComponent={Link} href={`/${params.lang}/account-setting/company/`}>
            {t('Edit')}
          </Button>
        }
      />
      <CardContent>
        <List>
          <List.Item icon={<LocationCityOutlined></LocationCityOutlined>} label='name'>
            {data.name}
          </List.Item>
          <List.Item icon={<LocationOnOutlined></LocationOnOutlined>} label='address'>
            {[data.street, data.street2, data.city, stateText, data.zip, countryText].filter(item => item).join(', ')}
          </List.Item>
          <List.Item icon={<TranslateOutlined></TranslateOutlined>} label='language'>
            {langText}
          </List.Item>
          <List.Item icon={<PhoneOutlined></PhoneOutlined>} label='phone'>
            {data.phone}
          </List.Item>
          <List.Item icon={<PhoneAndroidOutlined></PhoneAndroidOutlined>} label='mobile'>
            {data.mobile}
          </List.Item>
          <List.Item icon={<EmailOutlined></EmailOutlined>} label='email'>
            {data.email}
          </List.Item>
          <List.Item icon={<WebOutlined></WebOutlined>} label='website'>
            {data.website}
          </List.Item>
        </List>
      </CardContent>
    </Card>
  )
}
