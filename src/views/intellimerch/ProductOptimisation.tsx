import React from 'react'

import type { BoxProps } from '@mui/material'
import { Box, Grid } from '@mui/material'
import { useImmer } from 'use-immer'

import type { SelectionItem } from './SearchTable'
import { SearchForm } from './SearchForm'
import { SearchTable } from './SearchTable'
import { CopywritingForm } from './CopywritingForm'

export function ProductOptimisation(props: Props) {
  const { ...restProps } = props

  const [state, updateState] = useImmer<PageState>({
    siteConnectionId: '',
    siteType: 0,
    categoryId: '',
    title: '',
    selection: []
  })

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3} {...restProps}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SearchForm
              onSearchSubmit={data => {
                updateState(state => {
                  state.siteConnectionId = data.siteConnectionId
                  state.siteType = data.siteType
                  state.categoryId = data.categoryId
                  state.title = data.title
                })
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CopywritingForm selection={state.selection} />
          </Grid>
        </Grid>
      </Box>

      <SearchTable
        pageState={state}
        disableRowSelectionOnClick
        checkboxSelection
        rowSelectionModel={state.selection.map(item => item.id)}
        onRowSelectionModelChange={evt => {
          updateState(state => {
            state.selection = evt
          })
        }}
        sx={{ height: 780 }}
      />
    </Box>
  )
}

type Props = BoxProps

export interface Res {
  total: number
  rows: TableRow[]
}

export interface TableRow {
  id: number
  string: string
  boolean: boolean
  date: Date
  dateTime: Date
  number: number
  singleSelect: string
  actions: string
}

export interface PageState {
  siteConnectionId: string
  siteType: number
  title: string
  categoryId: string
  selection: SelectionItem[]
}
