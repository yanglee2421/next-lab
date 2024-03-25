import { NextResponse } from 'next/server'
import { prisma } from '@/data/prisma'
import { validateAuthorization } from '@/libs/validateAuthorization'
import { withErrorHandler } from '@/libs/withErrorHandler'

export const GET = withErrorHandler(async request => {
  const { error } = await validateAuthorization(request)

  if (error) {
    return error
  }

  const data = await prisma.post.findMany()

  return NextResponse.json({ data })
})

export const POST = withErrorHandler(async request => {
  const { error } = await validateAuthorization(request)

  if (error) {
    return error
  }

  const data = await request.json()

  return NextResponse.json({ data })
})
