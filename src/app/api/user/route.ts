import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/data/prisma'

export async function GET(request: NextRequest) {
  console.log(request)

  const data = await prisma.user.findMany({
    include: {
      children: true
    }
  })

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const user = await prisma.user.create({
    data: {
      name: body.name
    }
  })

  return NextResponse.json({ data: user })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()

  const data = await prisma.user.update({
    data: {
      parent: {
        connect: { id: 2 }
      }
    },
    where: {
      id: 1
    }
  })

  return NextResponse.json({ data, body })
}
