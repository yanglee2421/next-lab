import { NextRequest, NextResponse } from 'next/server'
import { validateJwt } from '@/libs/validateJwt'
import { prisma } from '@/data/prisma'

export async function validateAuthorization(request: NextRequest) {
  const authorization = request.headers.get('Authorization')
  const jwt = authorization?.split(' ').at(-1)

  const fallback = {
    user: null,
    error: NextResponse.json(
      {
        error: 'Forbidden'
      },
      { status: 403 }
    )
  }

  if (!jwt) {
    return fallback
  }

  const jwtPayload = validateJwt(jwt)

  if (typeof jwtPayload === 'string') {
    return fallback
  }

  const user = await prisma.user.findUnique({
    where: {
      id: jwtPayload.id,
      name: jwtPayload.name,
      phone: jwtPayload.phone
    }
  })

  if (!user) {
    return fallback
  }

  return { error: null, user }
}
