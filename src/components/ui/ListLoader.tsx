import React from 'react'

import type { ListProps } from '@mui/material';
import { List } from '@mui/material'

import { SkeletonListItem } from './SkeletonListItem'


export const ListLoader = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  return (
    <List ref={ref} {...props}>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
    </List>
  )
})
