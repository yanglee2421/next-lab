import { NextResponse } from 'next/server'

import { z } from 'zod'

import { prisma } from '@/data/prisma'
import { createJwt } from '@/libs/createJwt'
import { withErrorHandler } from '@/libs/withErrorHandler'

export const POST = withErrorHandler(async request => {
  const body = await request.json()
  const params = schema.parse(body)

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      phone: params.phone,
      password: params.password
    }
  })

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

const schema = z.object({
  phone: z.string(),
  password: z.string()
})
