import React from 'react'

import type { SxProps, Theme } from '@mui/material'
import { FormControl, FormLabel, Grid, Typography, Badge, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { CopyBtn } from '@/components'
import { ScrollView } from '@/components/ui'

export function ArticleDetail(props: ArticleDetailProps) {
  const { badgeColor, badgeContent, badgeSx, showCopy, description, title, keywords } = props

  const { t } = useTranslation()

  return (
    <Badge component={'div'} badgeContent={badgeContent} color={badgeColor} sx={badgeSx}>
      <Grid
        container
        spacing={4}
        sx={{
          '& img': {
            maxWidth: '100%'
          }
        }}
      >
        <Grid item xs={12}>
          {(() => {
            if (!title) return

            return (
              <Box position={'relative'}>
                {showCopy && <CopyBtn text={title} sx={{ position: 'absolute', zIndex: 100, top: 0, right: 0 }} />}
                <FormControl>
                  <FormLabel>{t('Title')}:</FormLabel>
                  <Typography variant='h6' mt={1} mr={8}>
                    {title}
                  </Typography>
                </FormControl>
              </Box>
            )
          })()}
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (!Array.isArray(keywords)) {
              return null
            }

            if (!keywords.length) {
              return null
            }

            return (
              <Box position={'relative'}>
                {showCopy && (
                  <CopyBtn
                    text={keywords.join()}
                    sx={{
                      position: 'absolute',
                      zIndex: 100,
                      top: 0,
                      right: 0
                    }}
                  />
                )}
                <FormControl>
                  <FormLabel>{t('Keywords')}:</FormLabel>
                  <Grid container spacing={3} mt={1} mr={8}>
                    {keywords.map(item => {
                      return (
                        <Grid key={item} item>
                          item
                        </Grid>
                      )
                    })}
                  </Grid>
                </FormControl>
              </Box>
            )
          })()}
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (!description) {
              return null
            }

            return (
              <Box position={'relative'}>
                {showCopy && (
                  <CopyBtn text={description} sx={{ position: 'absolute', zIndex: 100, top: 0, right: 0 }}></CopyBtn>
                )}
                <FormControl>
                  <FormLabel>{t('Description')}:</FormLabel>
                  <ScrollView mt={4} mr={8}>
                    <Box
                      whiteSpace={'pre-line'}
                      dangerouslySetInnerHTML={{
                        __html: description
                      }}
                    ></Box>
                  </ScrollView>
                </FormControl>
              </Box>
            )
          })()}
        </Grid>
      </Grid>
    </Badge>
  )
}

export interface ArticleDetailProps {
  badgeContent?: React.ReactNode
  badgeColor?: 'error' | 'success'
  badgeSx?: SxProps<Theme>
  showCopy?: boolean
  title: string
  keywords: string[]
  description: string
}
