'use client'

// MUI Imports
import React from 'react'

import type { SelectProps } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// React Imports

export function IntervalSelect(props: SelectProps) {
  // ** Props
  const { ...restProps } = props

  return (
    <>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>grouped by</InputLabel>
        <Select label='grouped by' size='small' {...restProps}>
          {Array.from(intervalMap.entries(), ([key, value]) => {
            return (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}

const intervalMap = new Map<string, string>()

intervalMap.set('hour', 'hour')
intervalMap.set('day', 'day')
intervalMap.set('week', 'week')
intervalMap.set('month', 'month')
