import {
  Button,
  FormGroup,
  Grid,
  Paper,
  Stack,
  FormControlLabel,
  Autocomplete,
  TextField,
  Tooltip
} from '@mui/material'
import {
  AutoFixHighOutlined,
  HideImageOutlined,
  AddPhotoAlternateOutlined,
  PlaylistRemoveOutlined,
  PlaylistAddOutlined
} from '@mui/icons-material'
import { useForm, FormProvider, useController, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ItemCheckbox } from '@/components/form'
import type { SelectionItem } from './SearchTable'

export function CopywritingForm(props: Props) {
  const { selection, ...restProps } = props

  const formCtx = useForm<FormValues>({
    defaultValues: {
      enabledTitle: true,
      enabledDescription: true,
      enabledKeywords: true,
      language: null
    },

    resolver: zodResolver(schema)
  })

  const controller = useController({
    control: formCtx.control,
    name: 'language',
    defaultValue: null
  })

  const [enabledTitle, enabledDescription, enabledKeywords] = useWatch({
    control: formCtx.control,
    name: ['enabledTitle', 'enabledDescription', 'enabledKeywords']
  })

  return (
    <Paper
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        data => {
          console.log([
            {
              role_no: 1,

              description_words_num: data.enabledDescription ? 100 : 0,
              keywords_num: data.enabledKeywords ? 5 : 0,
              title_words_num: data.enabledTitle ? 20 : 0,

              description: '',
              keywords: [],
              title: '',

              language: data.language
            }
          ])
        },
        error => {
          console.error(error)
        }
      )}
      sx={{ padding: 3 }}
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              {...controller.field}
              onChange={(evt, value) => {
                void evt
                controller.field.onChange(value)
              }}
              options={options()}
              renderInput={props => {
                return <TextField {...props} size='small' label='Language'></TextField>
              }}
            ></Autocomplete>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={<ItemCheckbox name='enabledTitle' size='small'></ItemCheckbox>}
                label='Title'
              ></FormControlLabel>
              <FormControlLabel
                control={<ItemCheckbox name='enabledDescription' size='small'></ItemCheckbox>}
                label='Description'
              ></FormControlLabel>
              <FormControlLabel
                control={<ItemCheckbox name='enabledKeywords' size='small'></ItemCheckbox>}
                label='Keywords'
              ></FormControlLabel>
            </FormGroup>
          </Grid>
        </Grid>

        <Stack direction={'row'} flexWrap={'wrap'} gap={3} marginTop={3}>
          <Button
            disabled={(() => {
              if (selection.length) {
                return [enabledTitle, enabledDescription, enabledKeywords].every(item => !item)
              }

              return true
            })()}
            type='submit'
            variant='contained'
            size='small'
            startIcon={<AutoFixHighOutlined></AutoFixHighOutlined>}
          >
            copywriting
          </Button>
          <ComingSoon>
            <Button
              disabled
              type='button'
              variant='outlined'
              size='small'
              startIcon={<HideImageOutlined></HideImageOutlined>}
            >
              Remove Background
            </Button>
          </ComingSoon>
          <ComingSoon>
            <Button
              disabled
              type='button'
              variant='outlined'
              size='small'
              startIcon={<AddPhotoAlternateOutlined></AddPhotoAlternateOutlined>}
            >
              Generate Image
            </Button>
          </ComingSoon>
          <ComingSoon>
            <Button
              disabled
              type='button'
              variant='outlined'
              size='small'
              startIcon={<PlaylistRemoveOutlined></PlaylistRemoveOutlined>}
            >
              Remove Words
            </Button>
          </ComingSoon>
          <ComingSoon>
            <Button
              disabled
              title='coming soon'
              type='button'
              variant='outlined'
              size='small'
              startIcon={<PlaylistAddOutlined></PlaylistAddOutlined>}
            >
              Add Words
            </Button>
          </ComingSoon>
        </Stack>
      </FormProvider>
    </Paper>
  )
}

type Props = {
  selection: SelectionItem[]
}

const schema = z.object({
  enabledTitle: z.boolean(),
  enabledDescription: z.boolean(),
  enabledKeywords: z.boolean(),
  language: z.string().nullable()
})

type FormValues = z.infer<typeof schema>

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

function ComingSoon(props: React.PropsWithChildren) {
  return (
    <Tooltip title='Coming soon'>
      <div>{props.children}</div>
    </Tooltip>
  )
}
