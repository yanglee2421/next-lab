import React from 'react'

import { useSearchParams } from 'next/navigation'

import { ListItem, ListItemAvatar, ListItemButton, Checkbox, Avatar, ListItemText } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'

import type { FormValues } from '../types'


export function ProductListItem(props: ProductListItemProps) {
  // ** Props
  const { itemData, ...restProps } = props
  const { image, title, id } = itemData

  const formCtx = useFormContext<FormValues>()

  const checkedsController = useController({
    control: formCtx.control,
    name: 'checkeds',
    defaultValue: []
  })

  const productSelected: Array<{ id: string }> = checkedsController.field.value

  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')

  return (
    <ListItemButton component='label' {...restProps} sx={{ pl: 0 }}>
      <ListItem
        secondaryAction={(() => {
          return (
            <Checkbox
              checked={productSelected.some(item => item.id === id)}
              onChange={evt => {
                const nextChecked = evt.target.checked
                const isHasExisted = productSelected.some(item => item.id === id)

                if (nextChecked && isHasExisted) {
                  return
                }

                if (nextChecked && !isHasExisted) {
                  return checkedsController.field.onChange([...productSelected, { ...itemData, connection_id }])
                }

                if (!nextChecked && isHasExisted) {
                  const nextValue = productSelected.filter(item => item.id !== id)

                  return checkedsController.field.onChange(nextValue)
                }

                if (!nextChecked && !isHasExisted) {
                  return
                }
              }}
            />
          )
        })()}
        sx={{
          pl: 0,
          '& .MuiListItemSecondaryAction-root': {
            right: 0
          }
        }}
      >
        <ListItemAvatar>
          <Avatar src={image} />
        </ListItemAvatar>
        <ListItemText
          title={title}
          sx={{
            '& span': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }
          }}
        >
          {title}
        </ListItemText>
      </ListItem>
    </ListItemButton>
  )
}

export interface ProductListItemProps {
  itemData: Product
}

interface Product {
  id: number | string
  title: string
  body_html: string
  image: string
  tags: string
}
