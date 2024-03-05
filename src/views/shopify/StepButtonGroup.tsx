import { Divider, ButtonGroup, Button } from '@mui/material'
import { ArrowUpwardOutlined, ArrowDownwardOutlined } from '@mui/icons-material'

export function StepButtonGroup(props: Props) {
  return (
    <>
      <Divider sx={{ marginBlock: 4 }}></Divider>
      <ButtonGroup>
        <Button
          onClick={props.onPrev}
          disabled={props.disabledPrev}
          variant={props.disabledNext ? 'contained' : 'outlined'}
          startIcon={<ArrowUpwardOutlined></ArrowUpwardOutlined>}
        >
          prev
        </Button>
        <Button
          onClick={props.onNext}
          disabled={props.disabledNext}
          variant={props.disabledNext ? 'outlined' : 'contained'}
          endIcon={<ArrowDownwardOutlined></ArrowDownwardOutlined>}
        >
          next
        </Button>
      </ButtonGroup>
    </>
  )
}

type Props = {
  onPrev(): void
  onNext(): void
  disabledPrev?: boolean
  disabledNext?: boolean
}
