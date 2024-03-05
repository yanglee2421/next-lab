import React from 'react'

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { ContentCopyOutlined, ContentCutOutlined, ContentPasteOutlined, MoreHorizOutlined } from '@mui/icons-material'

export function ActionsCell() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={evt => {
          setAnchorEl(evt.currentTarget)
        }}
      >
        <MoreHorizOutlined />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 180
            }
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentCutOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ctrl + X
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentCopyOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ctrl + c
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentPasteOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ctrl + v
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
