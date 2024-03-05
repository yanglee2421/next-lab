import React from 'react'

import { styled } from '@mui/material'
import { StyleOutlined, SearchOutlined, TranslateOutlined, AssistantOutlined } from '@mui/icons-material'
import type { TabListProps } from '@mui/lab'
import { TabContext, TabList } from '@mui/lab'

import { TabItem } from './TabItem'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function CardTabs() {
  const tab = useCopywritingStore(s => s.tab)
  const setTab = useCopywritingStore(s => s.setTab)

  return (
    <TabContext value={String(tab)}>
      <TabListStyled
        onChange={(evt, v) => {
          void evt
          React.startTransition(() => {
            setTab(Number(v))
          })
        }}
      >
        <TabItem icon={<StyleOutlined></StyleOutlined>} value='1' label='Product Description'></TabItem>
        <TabItem icon={<SearchOutlined></SearchOutlined>} value='2' label='SEO Article'></TabItem>
        <TabItem icon={<TranslateOutlined></TranslateOutlined>} value='3' label='GPT Translate'></TabItem>
        <TabItem icon={<AssistantOutlined></AssistantOutlined>} value='0' label='AI Assistant'></TabItem>
      </TabListStyled>
    </TabContext>
  )
}

const TabListStyled = styled(TabList)<TabListProps>(({ theme }) => ({
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
  },

  minHeight: 38,
  border: 0
}))
