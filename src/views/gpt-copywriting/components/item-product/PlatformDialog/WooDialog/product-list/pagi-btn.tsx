import { ButtonGroup, IconButton } from '@mui/material'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { useFormContext, useController } from 'react-hook-form'

export function PagiBtn(props: PagiBtnProps) {
  const { page_limt, total } = props

  const formCtx = useFormContext()

  const pageController = useController({
    name: 'page',
    control: formCtx.control,
    defaultValue: 1
  })

  return (
    <ButtonGroup>
      <IconButton
        onClick={() => {
          const page = pageController.field.value

          pageController.field.onChange(page - 1)
        }}
        disabled={(() => {
          return pageController.field.value < 2
        })()}
      >
        <ChevronLeftOutlined></ChevronLeftOutlined>
      </IconButton>
      <IconButton
        onClick={() => {
          const page = pageController.field.value

          pageController.field.onChange(page + 1)
        }}
        disabled={(() => {
          const page = pageController.field.value

          
return page * page_limt > total
        })()}
      >
        <ChevronRightOutlined></ChevronRightOutlined>
      </IconButton>
    </ButtonGroup>
  )
}

export interface PagiBtnProps {
  page_limt: number
  total: number
}
