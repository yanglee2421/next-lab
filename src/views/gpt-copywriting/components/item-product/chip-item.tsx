import { Grid, Chip } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'

export function ChipItem(props: ChipItemProps) {
  // ** Props
  const { label, id } = props

  // Form Field
  const { control } = useFormContext()

  const { field } = useController({
    name: 'product',
    control,
    defaultValue: []
  })

  const handleDelete = () => {
    const prevList: Array<{ id: string }> = field.value
    const nextList = prevList.filter(item => item.id !== id)

    field.onChange(nextList)
  }

  return (
    <Grid item>
      <Chip variant='outlined' label={toMaxLength(label)} onDelete={handleDelete} />
    </Grid>
  )
}

export interface ChipItemProps {
  label: string
  id: string
}

export function toMaxLength(label: string, maxlength = 24) {
  const isMoreThan28 = label.length > maxlength
  const subString = label.substring(0, maxlength)

  if (isMoreThan28) return `${subString}...`

  return label
}
