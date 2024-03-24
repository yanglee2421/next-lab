import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/data/prisma'

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('Authorization')
  const jwt = authorization?.split(' ').at(-1)
  if (!jwt) {
    return NextResponse.error()
  }

  try {
    const user = verify(jwt, 'sec')
  } catch (error) {}

  const data = await prisma.post.findMany()

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  return NextResponse.json({ data })
}
