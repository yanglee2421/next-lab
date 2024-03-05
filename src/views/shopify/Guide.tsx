import React from 'react'

import type {
  StepIconProps} from '@mui/material';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Box,
  IconButton,
  Button,
  Typography,
  Link,
  Card,
  CardHeader,
  Stack,
  Tooltip
} from '@mui/material'
import {
  InstallDesktopOutlined,
  TaskAltOutlined,
  VpnKeyOutlined,
  ContentCopyOutlined,
  TuneOutlined,
  DashboardCustomizeOutlined,
  AutoGraphOutlined
} from '@mui/icons-material'
import { useImmer } from 'use-immer'


import { StepButtonGroup } from './StepButtonGroup'

export function Guide(props: Props) {
  const [state, updateState] = useImmer({
    step: 0
  })

  const handleStepPrev = () => {
    updateState(state => {
      if (state.step > 0) {
        state.step -= 1
      }
    })
  }

  const handleStepNext = () => {
    updateState(state => {
      if (state.step < 4) {
        state.step += 1
      }
    })
  }

  const stepButtonGroup = (
    <StepButtonGroup
      onNext={handleStepNext}
      onPrev={handleStepPrev}
      disabledNext={Object.is(state.step, 4)}
      disabledPrev={Object.is(state.step, 0)}
    ></StepButtonGroup>
  )

  return (
    <>
      <Typography variant='h4'>Usage In Shopify</Typography>
      <Typography mt={3}>Not sure how to use it? Please refer to the following steps.</Typography>
      <Box mt={4}>
        <Stepper activeStep={state.step} orientation='vertical'>
          <Step key={0}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                icon: <InstallDesktopOutlined></InstallDesktopOutlined>
              }}
            >
              <Typography variant='h6'>Install app</Typography>
            </StepLabel>
            <StepContent>
              Install{' '}
              <Link href='#' target='shopify_plugin' underline='always' sx={{ textDecorationLine: 'underline' }}>
                WarpDriven Recommender
              </Link>{' '}
              through the Shopify app store.
              {stepButtonGroup}
            </StepContent>
          </Step>
          <Step key={1}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                icon: <AutoGraphOutlined></AutoGraphOutlined>
              }}
            >
              <Typography variant='h6'>Initialize Product</Typography>
            </StepLabel>
            <StepContent>
              <Typography>
                Then, <Button onClick={props.onLastClick}>click here</Button> to hand over your product to AI and AI
                will analyze your product
              </Typography>
              {stepButtonGroup}
            </StepContent>
          </Step>
          <Step key={2}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                icon: <VpnKeyOutlined></VpnKeyOutlined>
              }}
            >
              <Typography variant='h6'>Copy API Key</Typography>
            </StepLabel>
            <StepContent>
              <Stack spacing={3}>
                <Typography>Copy the following Recommender API Key and Data Server Key.</Typography>
                <Card>
                  <CardHeader
                    title={'xxxxxxxxx'}
                    subheader={'Recommender API Key'}
                    action={
                      <Tooltip title='Click to copy Recommender API Key'>
                        <IconButton>
                          <ContentCopyOutlined></ContentCopyOutlined>
                        </IconButton>
                      </Tooltip>
                    }
                    sx={{ p: 2 }}
                  ></CardHeader>
                </Card>
                <Card>
                  <CardHeader
                    title={<Typography variant='h6'>xxxxxxxxx</Typography>}
                    subheader={'Data Server Key'}
                    action={
                      <Tooltip title='Click to copy Data Server Key'>
                        <IconButton>
                          <ContentCopyOutlined></ContentCopyOutlined>
                        </IconButton>
                      </Tooltip>
                    }
                    sx={{ p: 2 }}
                  ></CardHeader>
                </Card>
              </Stack>
              {stepButtonGroup}
            </StepContent>
          </Step>
          <Step key={3}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                icon: <TuneOutlined></TuneOutlined>
              }}
            >
              <Typography variant='h6'>Enable Extension</Typography>
            </StepLabel>
            <StepContent>
              <ol>
                <li>
                  Go to the{' '}
                  <Link href='#' target='shopify_plugin' underline='always' sx={{ textDecorationLine: 'underline' }}>
                    management panel
                  </Link>{' '}
                  of your store
                </li>
                <li>Click the "Customize" button to enter the shop editor</li>
                <li>Click the "App embeds" icon</li>
                <li>Turn on the switch on the right side</li>
                <li>Expand Warpdriven Config</li>
                <li>Turn off "Test Mode"</li>
                <li>Paste the Recommender API Key into the Recommender API Key input</li>
                <li>Paste the Data Server Key into the Data Server Key input</li>
                <li>Click the save button in the upper right corner</li>
              </ol>
              {stepButtonGroup}
            </StepContent>
          </Step>
          <Step key={4}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                icon: <DashboardCustomizeOutlined></DashboardCustomizeOutlined>
              }}
            >
              <Typography variant='h6'>Add Block</Typography>
            </StepLabel>
            <StepContent>
              <ol>
                <li>Click the "Home page" on the top bar to open the page selector</li>
                <li>Click on the Products page and select a template</li>
                <li>Click on the "Sections" icon in the left column</li>
                <li>Click "Add block" button</li>
                <li>Click "Apps" button</li>
                <li>Add "Warpdriven CF"/"Warpdriven VSR" block</li>
                <li>Click "save" button</li>
              </ol>
              <Typography variant='subtitle1'>Congratulations, all steps completed! 🎉</Typography>
              {stepButtonGroup}
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </>
  )
}

type Props = {
  onLastClick(): void
}

function StepIcon(props: StepIconProps) {
  if (props.completed) {
    return <TaskAltOutlined color='primary'></TaskAltOutlined>
  }

  return props.icon
}
