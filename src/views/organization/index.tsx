'use client'

import { Card, CardContent, CardHeader, Grid } from '@mui/material'

import { PendingTable } from './pending-table'
import { MembersTable } from './members-table'
import { InviteDialog } from './invite-dialog'

export function Organization() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Pending Invites' action={<InviteDialog />} />
          <CardContent>
            <PendingTable />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Members' />
          <CardContent>
            <MembersTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
