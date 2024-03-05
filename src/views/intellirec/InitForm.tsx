import { useSearchParams } from 'next/navigation'

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  alpha,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  ListSubheader,
  Checkbox
} from '@mui/material'

import { useForm, FormProvider, useController } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { AutoAwesomeOutlined, RefreshOutlined } from '@mui/icons-material'

import { toast } from 'react-toastify'

import { ScrollView } from '@components/ui/ScrollView'
import { ItemCheckbox } from '@components/form/ItemCheckbox'
import { useCollectionList } from '@/hooks/api-nuwa/useCollectionList'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import { stringToColor } from '@/utils/stringToColor'

import { useRecsInit } from '@/hooks/api-stg/useRecsInit'

export function InitForm() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      collection_ids: [],
      recs_type: 2
    },

    resolver: zodResolver(schema)
  })

  const controller = useController({
    control: formCtx.control,
    name: 'collection_ids'
  })

  const recsTypeController = useController({
    control: formCtx.control,
    name: 'recs_type'
  })

  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id') || ''

  const query = useCollectionList(connection_id)
  const mutation = useRecsInit()

  if (query.isPending) {
    return <SkeletonCard />
  }

  if (query.isError) {
    return <ErrorAlert>{query.error.message}</ErrorAlert>
  }

  return (
    <Card
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        data => {
          return new Promise<void>(resolve => {
            mutation.mutate(
              {
                data: {
                  collection_ids: data.collection_ids,
                  recs_type: 2
                },
                headers: {
                  'site-connection-id': connection_id
                }
              },
              {
                onSettled() {
                  resolve()
                },
                onError(error) {
                  toast.error(error.message)
                },
                onSuccess() {
                  toast.success('Successlly')
                }
              }
            )
          })
        },
        error => {
          console.error(error)
        }
      )}
      onReset={() => {
        formCtx.reset()
      }}
      noValidate
      autoComplete='off'
    >
      <FormProvider {...formCtx}>
        <CardHeader
          title='GET STARTED'
          subheader={
            controller.fieldState.error
              ? controller.fieldState.error.message
              : 'Which categories of products do you want us to recommend?'
          }
          subheaderTypographyProps={{
            sx(theme) {
              return {
                color: controller.fieldState.error ? `${theme.palette.error.main} !important` : void 0
              }
            }
          }}
        />
        <CardContent>
          <RadioGroup
            {...recsTypeController.field}
            value={String(recsTypeController.field.value)}
            onChange={(evt, value) => {
              void evt
              recsTypeController.field.onChange(Number(value))
            }}
            row
          >
            <FormControlLabel label='Visually Similar' control={<Radio />} value='2' />
            <FormControlLabel label='Collaboration Filter' control={<Radio />} value='3' />
          </RadioGroup>
          <ScrollView maxHeight={480}>
            <List
              subheader={
                <ListSubheader
                  sx={{
                    borderBottom(theme) {
                      return `1px solid ${theme.palette.divider}`
                    },
                    textAlign: 'end'
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={controller.field.value.length === query.data.collections.length}
                        onChange={(evt, checked) => {
                          void evt
                          controller.field.onChange(
                            checked ? query.data.collections.map(item => item.collection_id) : []
                          )
                        }}
                        indeterminate={(() => {
                          if (controller.field.value.length === query.data.collections.length) {
                            return false
                          }

                          if (controller.field.value.length) {
                            return true
                          }

                          return false
                        })()}
                      />
                    }
                    label='Select All'
                  />
                </ListSubheader>
              }
            >
              {query.data.collections.map(item => {
                return (
                  <ListItemButton key={item.collection_id} component='label'>
                    <ListItemAvatar>
                      <Avatar
                        sx={() => {
                          const color = stringToColor(item.collection_title)

                          return {
                            bgcolor: alpha(color, 0.15),
                            color
                          }
                        }}
                      >
                        {item.collection_title.at(0)?.toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.collection_title} secondary={item.collection_id} />
                    <ListItemSecondaryAction>
                      <ItemCheckbox name='collection_ids' value={String(item.collection_id)} />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                )
              })}
            </List>
          </ScrollView>
        </CardContent>
        <CardActions>
          <Button
            disabled={formCtx.formState.isSubmitting}
            variant='contained'
            type='submit'
            startIcon={<AutoAwesomeOutlined />}
          >
            submit
          </Button>
          <Button
            disabled={formCtx.formState.isSubmitting}
            variant='outlined'
            type='reset'
            startIcon={<RefreshOutlined />}
          >
            reset
          </Button>
        </CardActions>
      </FormProvider>
    </Card>
  )
}

const schema = z.object({
  collection_ids: z.string().array().nonempty(),
  recs_type: z.number()
})

type FormValues = z.infer<typeof schema>
