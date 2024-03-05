import Link from 'next/link'

import { useParams } from 'next/navigation'

import { Card, Typography, CardContent, Button, CardMedia, CardActions, Box } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function RightError() {
  const error = useCopywritingStore(s => s.error)
  const setError = useCopywritingStore(s => s.setError)
  const { t } = useTranslation()
  const params = useParams()

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
      <CardContent
        sx={{
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button LinkComponent={Link} href={`/${params.lang}/subscription`} variant='contained'>
            {t('Upgrade Plan')}
          </Button>
        </Box>
        <Typography variant='h6' sx={{ mb: 2.75 }}>
          {error?.cause ? String(error?.cause) : 'Error Tips'}
        </Typography>
        {(() => {
          const list = error?.message?.split(',') || []

          return list.map((item, index) => {
            const isLast = index === list.length - 1
            const text = isLast ? item : `${item},`

            return (
              <Typography
                key={item}
                sx={{
                  mb: 6,
                  '&::before': {
                    content: "''",
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'primary.main',
                    mr: 3
                  }
                }}
              >
                {text}
              </Typography>
            )
          })
        })()}
      </CardContent>
      <CardActions>
        <Box display={'flex'} justifyContent={'center'} width={'100%'}>
          <Button
            onClick={() => {
              setError(null)
            }}
            variant='outlined'
            sx={{
              p(theme) {
                return theme.spacing(1.75, 5.5)
              }
            }}
          >
            {t('Back To Tasks')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
