import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import { prisma } from '@/data/prisma'

export async function GET(request: NextRequest) {
  console.log(request)

  const data = await prisma.post.findMany()

  
return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  
return NextResponse.json({ data })
}
