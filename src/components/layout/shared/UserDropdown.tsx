'use client'

import React from 'react'
import type { MouseEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { useQueryClient } from '@tanstack/react-query'

import { useSettings } from '@core/hooks/useSettings'
import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'
import { useAuth } from '@/hooks/useAuth'

export default function UserDropdown() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const { settings } = useSettings()
  const router = useRouter()
  const queryClient = useQueryClient()
  const clearAccessToken = useAuthLocalStore(s => s.clearAccessToken)
  const auth = useAuth()
  const params = useParams()

  const handleDropdownOpen = () => {
    setOpen(p => !p)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  if (!auth) {
    return null
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='Avatar'
          src={auth.user_data.avatar ? `data:image/png;base64,${auth.user_data.avatar}` : '/images/avatars/1.png'}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar
                      alt='Avatar'
                      src={
                        auth.user_data.avatar
                          ? `data:image/png;base64,${auth.user_data.avatar}`
                          : '/images/avatars/1.png'
                      }
                    />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {auth.user_data.name}
                      </Typography>
                      <Typography variant='caption'>{auth.user_data.email}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem
                    className='gap-3'
                    onClick={e => {
                      handleDropdownClose(e, `/${params.lang}/user/overview/`)
                    }}
                  >
                    <i className='ri-user-3-line text-[22px]' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3'
                    onClick={e => {
                      handleDropdownClose(e, `/${params.lang}/account-setting/account/`)
                    }}
                  >
                    <i className='ri-settings-4-line text-[22px]' />
                    <Typography color='text.primary'>Account</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3'
                    onClick={e => {
                      handleDropdownClose(e, `/${params.lang}/subscription/1`)
                    }}
                  >
                    <i className='ri-money-dollar-circle-line text-[22px]' />
                    <Typography color='text.primary'>Subscriptions</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3'
                    onClick={e => {
                      handleDropdownClose(e, `/${params.lang}/organization`)
                    }}
                  >
                    <i className='ri-organization-chart text-[22px]' />
                    <Typography color='text.primary'>Organization</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={() => {
                        clearAccessToken()
                        queryClient.setQueryData(['refresh_token'], null)
                        queryClient.clear()
                      }}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})
