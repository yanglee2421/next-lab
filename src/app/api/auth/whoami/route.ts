import { NextResponse } from 'next/server'

import { validateAuthorization } from '@/libs/validateAuthorization'
import { createJwt } from '@/libs/createJwt'
import { withErrorHandler } from '@/libs/withErrorHandler'

export const GET = withErrorHandler(async request => {
  const { user, error } = await validateAuthorization(request)

  if (error) {
    return error
  }

  const userInfo = {
    id: user.id,
    name: user.name,
    phone: user.phone
  }

  const token = createJwt(userInfo)

  return NextResponse.json({
    user: userInfo,
    token
  })
})
