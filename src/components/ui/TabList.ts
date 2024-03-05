'use client'

import { TabList as MuiTabList } from '@mui/lab'
import { styled } from '@mui/material'

export const TabList = styled(MuiTabList)(({ theme }) => {
  return {
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
      minWidth: 65,
      minHeight: 38,
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up('sm')]: {
        minWidth: 130
      }
    }
  }
})
