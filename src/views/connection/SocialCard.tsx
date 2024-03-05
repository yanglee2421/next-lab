import { Card, CardContent, Box, Typography, Button, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DeleteOutline, LinkOutlined } from '@mui/icons-material'

export function SocialCard() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('Social')}></CardHeader>
      <CardContent>
        {getList().map(account => {
          return (
            <Box
              key={account.title}
              sx={{
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:not(:last-of-type)': { mb: 4 },
                filter: 'opacity(50%)',
                cursor: 'not-allowed'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    mr: 4,
                    minWidth: 45,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img src={account.logo} alt={account.title} height='30' />
                </Box>
                <div>
                  <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                  {account.isConnected ? (
                    <Typography sx={{ color: 'primary.main', textDecoration: 'none' }}>{account.username}</Typography>
                  ) : (
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      Massive social media platform for personal connections, content sharing, and targeted advertising
                    </Typography>
                  )}
                </div>
              </Box>
              <Button variant='outlined' sx={{ p: 1.5, minWidth: 38 }} color='secondary' disabled>
                {account.isConnected ? <DeleteOutline></DeleteOutline> : <LinkOutlined></LinkOutlined>}
              </Button>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

function getList() {
  return [
    {
      title: 'Facebook',
      isConnected: false,
      logo: '/images/logos/facebook.png',
      username: ''
    }
  ]
}
