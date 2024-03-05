import { ButtonGroup, IconButton } from '@mui/material'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

export function PagiBtn(props: PagiBtnProps) {
  const { name, prev = '', next = '' } = props

  const { control } = useFormContext()
  const { field } = useController({ name, control, defaultValue: '' })

  const handlePrevClick = () => field.onChange(prev)
  const handleNextClick = () => field.onChange(next)

  return (
    <ButtonGroup>
      <IconButton onClick={handlePrevClick} disabled={!prev}>
        <ChevronLeftOutlined></ChevronLeftOutlined>
      </IconButton>
      <IconButton onClick={handleNextClick} disabled={!next}>
        <ChevronRightOutlined></ChevronRightOutlined>
      </IconButton>
    </ButtonGroup>
  )
}

export interface PagiBtnProps {
  name: string
  prev?: string
  next?: string
}
