import React from 'react'

import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'


export function ItemLang(props: Props) {
  const { name } = props

  const formCtx = useFormContext()
  const controller = useController({ name, control: formCtx.control })
  const tab = useCopywritingStore(s => s.tab)
  const { t } = useTranslation()

  React.useEffect(() => {
    void tab
    formCtx.clearErrors([name])
  }, [tab, formCtx, name])

  const lang_list = options()
  const value = lang_list.find(item => item === controller.field.value)

  return (
    <FormControl fullWidth error={!!controller.fieldState.error}>
      <Autocomplete
        options={lang_list}
        renderInput={params => <TextField {...params} error={!!controller.fieldState.error} label={t('Lang')} />}
        {...controller.field}
        value={value || null}
        onChange={(evt, v) => {
          void evt
          controller.field.onChange(v)
        }}
      />
      {controller.fieldState.error && <FormHelperText>{controller.fieldState.error.message}</FormHelperText>}
    </FormControl>
  )
}

type Props = {
  name: string
}

function options() {
  return [
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Czech',
    'Danish',
    'Dutch',
    'English(US)',
    'English(UK)',
    'English(AU)',
    'English(CA)',
    'Finnish',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Korean',
    'Norwegian',
    'Polish',
    'Portuguese(Brazil)',
    'Portuguese(Portugal)',
    'Spanish',
    'Swedish',
    'Thai',
    'Turkish',
    'Vietnamese'
  ]
}
