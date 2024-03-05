import React from 'react'

import { Chip, FormControl, FormHelperText, Box, OutlinedInput } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

export function ItemTags(props: Props) {
  const { name } = props

  const formCtx = useFormContext()
  const { control } = formCtx

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: []
  })

  const { value } = field
  const { error } = fieldState

  const [showInput, setShowInput] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleBlur = () => {
    setShowInput(false)
    setInputValue('')

    if (!inputValue) {
      return
    }

    const list: string[] = value
    const isExist = list.includes(inputValue)

    isExist || field.onChange([...list, inputValue])
  }

  return (
    <FormControl error={!!error}>
      <Box display={'flex'} gap={3} flexWrap={'wrap'}>
        {(() => {
          const list: string[] = value

          return list.map((item, index) => {
            return (
              <Chip
                key={item}
                label={item}
                color={toColors(index)}
                variant='outlined'
                onDelete={() => {
                  field.onChange(list.filter(row => row !== item))
                }}
              />
            )
          })
        })()}
        {showInput ? (
          <OutlinedInput
            value={inputValue}
            onChange={evt => {
              setInputValue(evt.target.value)
            }}
            onBlur={handleBlur}
            onKeyDown={evt => {
              const isEnter = evt.key.toLowerCase() === 'enter'

              if (!isEnter) {
                return
              }

              handleBlur()
            }}
            size='small'
            autoFocus
          />
        ) : (
          <Chip
            onClick={() => {
              setShowInput(true)
            }}
            label='Add'
            clickable
            variant='outlined'
            icon={<AddOutlined></AddOutlined>}
          />
        )}
      </Box>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}

type Colors = ['error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default']
type Color = Colors extends [infer TColor] ? TColor : never

function toColors(index: number) {
  const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning']

  return colors.at(index % colors.length) as Color | undefined
}

type Props = {
  name: string
}
