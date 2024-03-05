'use client'

import React from 'react'

import { TableRow, TableCell, Chip } from '@mui/material'
import { CheckCircleOutline, CloseOutlined } from '@mui/icons-material'

import type { Plan } from '@/api/api-stg/get_all_plans'

export function BodyRow(props: BodyRowProps) {
  const { feature, columns } = props

  return (
    <TableRow>
      <TableCell>{feature}</TableCell>
      {columns.map(item => {
        const featrues = item.product_description_sale?.split('\n') || []

        return <Cell key={item.product_id} cell={featrues.includes(feature || '')}></Cell>
      })}
    </TableRow>
  )
}

export interface BodyRowProps {
  feature?: string
  columns: Plan[]
}

function Cell(hasTwops: CellProps) {
  const { cell } = hasTwops

  if (typeof cell === 'string') {
    return <Chip size='small' label={cell} color='primary' sx={{ lineHeight: 1 }}></Chip>
  }

  return (
    <TableCell
      align='center'
      sx={{
        '& svg': {
          verticalAlign: 'middle',
          color: cell ? 'primary.main' : 'text.disabled'
        },
        fontSize: 20
      }}
    >
      {cell ? (
        <CheckCircleOutline fontSize='inherit'></CheckCircleOutline>
      ) : (
        <CloseOutlined fontSize='inherit'></CloseOutlined>
      )}
    </TableCell>
  )
}

interface CellProps {
  cell?: boolean | string
}
