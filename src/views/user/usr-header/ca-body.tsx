'use client'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import { CardContent, styled, Box, Typography, Button } from '@mui/material'
import { CalendarMonthOutlined, ApartmentOutlined, EditOutlined, LocationOnOutlined } from '@mui/icons-material'

import { useTranslation } from 'react-i18next'

import { useCompanyQuery, useValidateJwtToken } from '@/hooks/api-erp'

export function CaBody() {
  const sx = getBodySx()

  const { t } = useTranslation()
  const query = useCompanyQuery()
  const userQuery = useValidateJwtToken()
  const params = useParams()

  const user = userQuery.data?.user_data

  return (
    <CardContent sx={sx}>
      <ProfilePicture
        src={user?.avatar ? `data:image/png;base64,${user.avatar}` : '/images/avatars/1.png'}
        alt='profile-picture'
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          ml: { xs: 0, md: 6 },
          alignItems: 'flex-end',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: ['center', 'space-between']
        }}
      >
        <Box
          sx={{
            mb: [6, 0],
            display: 'flex',
            flexDirection: 'column',
            alignItems: ['center', 'flex-start']
          }}
        >
          <Typography variant='h5' sx={{ mb: 4 }}>
            {user?.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: ['center', 'flex-start']
            }}
          >
            <Box
              sx={{
                mr: 5,
                display: 'flex',
                alignItems: 'center',
                '& svg': { mr: 1, color: 'text.secondary' }
              }}
            >
              <LocationOnOutlined></LocationOnOutlined>
              <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>{user?.city}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': { mr: 1, color: 'text.secondary' }
              }}
            >
              <CalendarMonthOutlined></CalendarMonthOutlined>
              <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
                {t('Joined')} {new Date(user?.join_date || 0).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <div>
          <Button
            LinkComponent={Link}
            href={`/${params.lang}/account-setting/account`}
            variant='contained'
            startIcon={<EditOutlined></EditOutlined>}
          >
            {t('Edit')}
          </Button>
          {(() => {
            if (!query.isError) {
              return null
            }

            return (
              <Button
                LinkComponent={Link}
                href={`/${params.lang}/account-setting/company`}
                variant='contained'
                startIcon={<ApartmentOutlined></ApartmentOutlined>}
                sx={{ ml: 3 }}
              >
                {t('Company')}
              </Button>
            )
          })()}
        </div>
      </Box>
    </CardContent>
  )
}

function getBodySx() {
  return {
    pt: 0,
    mt: -8,
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: { xs: 'wrap', md: 'nowrap' },
    justifyContent: { xs: 'center', md: 'flex-start' }
  }
}

// Styled Components
const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))
