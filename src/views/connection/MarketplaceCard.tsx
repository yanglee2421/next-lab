import { Card, CardContent, CardHeader } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function MarketplaceCard() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('Marketplace')} sx={{ '& .MuiCardHeader-action': { mt: -0.8 } }} />
      <CardContent>
        {withdrawData.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== depositData.length - 1 ? 7.3125 : 0,
                filter: 'opacity(50%)',
                cursor: 'not-allowed'
              }}
            >
              <Box
                sx={{
                  minWidth: 36,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
              </Box>
              <Box
                sx={{
                  ml: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ mb: 0.5, fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'error.main' }}>
                  {item.amount}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

const depositData = [
  {
    logoWidth: 28,
    logoHeight: 29,
    amount: '+$4,650',
    subtitle: 'Sell UI Kit',
    title: 'Gumroad Account',
    logo: '/images/logos/gumroad.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    amount: '+$92,705',
    title: 'Mastercard',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/mastercard-label.png'
  },
  {
    logoWidth: 20,
    logoHeight: 28,
    amount: '+$957',
    title: 'Stripe Account',
    subtitle: 'iOS Application',
    logo: '/images/logos/stripe.png'
  },
  {
    logoWidth: 34,
    logoHeight: 32,
    amount: '+$6,837',
    title: 'American Bank',
    subtitle: 'Bank Transfer',
    logo: '/images/logos/american-bank.png'
  },
  {
    logoWidth: 33,
    logoHeight: 22,
    amount: '+$446',
    title: 'Bank Account',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/citi-bank.png'
  }
]

const withdrawData = [
  {
    logo: '/images/logos/Amazon_logo.svg',
    logoWidth: 36,
    logoHeight: 21,
    amount: '$0',

    title: 'Amazon',
    subtitle: 'Global e-commerce leader with vast product selection and efficient fulfillment'
  },
  {
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM0IiBoZWlnaHQ9IjU0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnPg0KICAgPHBhdGggZD0ibTI2LjkxLDI1LjE1Yy0wLjI2LC02IC01LC04LjYgLTkuNiwtOC42Yy01LDAgLTkuMywyLjYgLTEwLDguNmwyMCwwbDAsMGwwLDBsLTAuNCwwem0tMjAsNC40YzAuNCw2IDQuNSwxMCAxMC40LDkuN2M0LDAgNy41LC0xLjYgOC43LC01LjJsNywwYy0xLjMsNy4yIC04LjksOS42IC0xNS41LDkuNmMtMTIsMCAtMTcuMiwtNi42IC0xNy4yLC0xNS40YzAsLTkuNyA1LjUsLTE2IDE3LjMsLTE2YzkuNCwwIDE2LjMsNSAxNi4zLDE1LjdsMCwxLjhsLTI3LDBsMCwwIiBmaWxsPSIjRTQzMTM3IiAvPg0KICAgPHBhdGggZD0ibTUxLDM5LjA1YzYsMCAxMC40LC00LjUgMTAuNCwtMTEuMmMwLC02LjcgLTQuMiwtMTEgLTEwLjQsLTExLjJjLTYsMCAtMTEsNC41IC0xMC41LDExLjJjMCw3IDQsMTEgMTEsMTEuMmwtMC41LDB6bS0xNywtMzguN2w2LjcsMGwwLDE2LjhjMywtNCA4LC01IDEyLjIsLTVjNywwIDE2LDUgMTUuNywxNS45YzAsOSAtNi42LDE1LjcgLTE1LjgsMTUuN2MtNSwwIC05LC0yIC0xMi4yLC01LjJjMCwxLjQgLTAuMSwyLjggLTAuMiw0bC02LjYsMCIgZmlsbD0iIzAwNjNEMSIgLz4NCiAgIDxwYXRoIGQ9Im04NC41LDI4Ljc1Yy02LDAgLTEwLDEgLTkuOCw1LjNjMCwzIDIsNSA3LjMsNS40YzcsMCAxMSwtNCAxMSwtMTBsMCwtMC43Yy0yLDAgMCwwIC04LDBsLTAuNSwwem0xNSw4LjNjMCwwIDAsNCAwLjIsNS42bC02LjIsMGMwLDAgMCwwIC0wLjIsLTQuMmMtMyw0IC03LDUgLTEzLDUuM2MtOCwwIC0xMywtNCAtMTIuNiwtOS40YzAsLTcgNiwtMTAgMTYuNCwtMTBjMywwIDAsMCA4LjcsMGwwLC0xYzAsLTUgLTMsLTcgLTguNSwtNi44Yy00LDAgLTcsMiAtNy4zLDQuNWwtNywwYzEsLTcgOCwtOSAxNSwtOWM4LDAgMTUsMyAxNC42LDExIiBmaWxsPSIjRjRBRTAxIiAvPg0KICAgPHBhdGggZD0ibTEzMy41LDEzLjI1bC0yMC42LDQwLjVsLTcuNSwwbDYsLTExLjNsLTE1LjUsLTI5LjNsNy44LDBsMTEuNCwyM2wxMS40LC0yMyIgZmlsbD0iIzg1QjcxNiIgLz4NCiA8L2c+DQo8L3N2Zz4=',
    logoWidth: 36,
    logoHeight: 21,
    amount: '$0',

    title: 'eBay',
    subtitle: 'Dynamic global marketplace facilitating auctions and fixed-price transactions'
  }
]

interface DataType {
  logo: string
  title: string
  amount: string
  subtitle: string
  logoWidth: number
  logoHeight: number
}
