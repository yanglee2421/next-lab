import React from 'react'

import RouterLink from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import type { ButtonProps } from '@mui/material'
import { ArrowDropDownOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'

import { useFormContext } from 'react-hook-form'

import { useMyConnections } from '@/hooks/api-stg/useMyConnections'
import { PlatformDialog } from './PlatformDialog'

export function BtnGroupSplit() {
  const { t } = useTranslation()
  const formCtx = useFormContext()
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const query = useMyConnections({ is_list_all: false, site_type: 1 })

  const router = useRouter()
  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')

  const handleToggle = () => {
    setOpen(p => !p)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (!query.data) {
      return
    }

    // Current value is within the allowed range
    if (
      query.data.some(item => {
        return item.connection_id === Number(connection_id)
      })
    ) {
      return
    }

    const fallbackConnection = query.data?.at(0)

    if (!fallbackConnection) {
      return
    }

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.searchParams.set('connection_id', String(fallbackConnection?.connection_id || ''))
        url.searchParams.set('site_info_id', String(fallbackConnection?.site_info_id || ''))
        url.searchParams.set('shop_alias', String(fallbackConnection?.shop_alias || ''))
        url.searchParams.set('site_name', String(fallbackConnection?.site_name || ''))
        url.searchParams.set('site_type', String(fallbackConnection?.site_type || ''))

        return url.href
      })()
    )
  }, [connection_id, query.data, router])

  if (query.isPending) {
    return (
      <LoadingButton variant='contained' loading>
        Loading
      </LoadingButton>
    )
  }

  if (query.isError) {
    return (
      <Button
        onClick={() => {
          query.refetch()
        }}
        variant='contained'
      >
        retry
      </Button>
    )
  }

  if (!query.data.length) {
    return (
      <Button LinkComponent={RouterLink} href='/connection/new-connection' variant='contained'>
        {t('Connect More Stores')}
      </Button>
    )
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} variant='contained'>
        <PlatformDialog />
        <Button onClick={handleToggle} sx={{ px: 0 }}>
          <ArrowDropDownOutlined></ArrowDropDownOutlined>
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {(() => {
                    return query.data.map(item => (
                      <MenuItem
                        key={item.connection_id}
                        selected={item.connection_id === Number(connection_id)}
                        onClick={() => {
                          const nextConnection = query.data?.find(row => {
                            return item.connection_id === row.connection_id
                          })

                          setOpen(false)
                          router.push(
                            (() => {
                              const url = new URL(window.location.href)

                              url.searchParams.set('connection_id', String(nextConnection?.connection_id || ''))
                              url.searchParams.set('site_info_id', String(nextConnection?.site_info_id || ''))
                              url.searchParams.set('shop_alias', String(nextConnection?.shop_alias || ''))
                              url.searchParams.set('site_name', String(nextConnection?.site_name || ''))
                              url.searchParams.set('site_type', String(nextConnection?.site_type || ''))

                              return url.href
                            })()
                          )

                          formCtx.resetField('product')
                        }}
                        title={map.get(item.site_type)}
                      >
                        {item.shop_alias || item.site_name}
                      </MenuItem>
                    ))
                  })()}
                  <MenuItem component={RouterLink} href='/connection/new-connection'>
                    {t('Connect More Stores')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export type BtnGroupSplitProps = ButtonProps

const map = new Map<number, string>()

map.set(1, 'shopify')
map.set(2, 'woocommerce')
map.set(3, 'shopline')
